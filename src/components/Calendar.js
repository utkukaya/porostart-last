import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import RevoCalendar from "revo-calendar";
import AppSettings, { Url } from '../AppSettings';
import { convertDate, info } from './Data/info';

const locationIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>'
const timeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>'


export default function Calendar() {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }

    const isAdmin = JSON.parse(localStorage.getItem("user"))?.token ?? false
    const [newEvent, setNewEvent] = useState(false)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [time, setTime] = useState("")
    const [biletixLink, setBiletixLink] = useState("")
    const [date, setDate] = useState("")
    const [allEvents, setAllEvents] = useState("")

    const translations = {
        turkish: {
            days: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
            daysShort: ["Pzrt", "Salı", "Çrş", "Prş", "Cuma", "Cmrt", "Pazar"],
            daysMin: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
            months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
            monthsShort: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
            noEventForThisDay: "Bir etkinlik bulunamadı",
            allDay: "Tüm Günler",
            //   addEvent: "Aldoni eventon",
            //   delete: "Forigi",
            eventTime: "Etkinlik Zamanı",
            previousYear: "Önceki Yıl",
            nextYear: "Gelecek Yıl",
            toggleSidebar: "Kenar Çubuğunu Değiştir",
            toggleDetails: "Ayrıntıları Aç",
        },
    };

    const dateSelectedFunction = (e) => {
        var date = e.day + "-" + (e.month + 1) + "-" + e.year
        const test = document.getElementsByClassName("sc-iBYQkv");
        if (test.length > 0) {
            var eventInfo = allEvents.find(x => x.date === convertDate(date));
            var eventDetailsHTML = '<p>' + eventInfo.name + '</p><div></div>' + locationIcon + '<span style="padding-left: 10px; margin-bottom: 5px">' + eventInfo.location + '</span><div></div>' + timeIcon + '<span style="padding-left: 10px; margin-bottom: 5px">' + eventInfo.time + '</span><div></div><form action="' + eventInfo.biletixLink + '"><button style="background-color: black; border-radius: 0; width: 100px">Bilet AL</button></form>';

            if (isAdmin) {
                eventDetailsHTML += '<button style="background-color: red; border-radius: 0; width: 100px" class="delete-button">Sil</button>';
            }
            if (eventInfo)
                document.getElementsByClassName("sc-iBYQkv")[0].innerHTML = eventDetailsHTML
            // document.getElementsByClassName("sc-iBYQkv")[0].innerHTML = '<p>' + eventInfo.name + '</p><div></div>' + locationIcon + '<span style="padding-left: 10px; margin-bottom: 5px">' + eventInfo.location + '</span><div></div>' + timeIcon + '<span style="padding-left: 10px; margin-bottom: 5px">' + eventInfo.time + '</span><div></div><form action="' + eventInfo.biletixLink + '"><button style="background-color: black; border-radius: 0; width: 100px">Bilet AL</button></from>'
        }
        var deleteButtons = document.getElementsByClassName("delete-button");

        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener("click", function (event) {
                deleteEvent(event, eventInfo.id); // Silme işlevini çağırın veya başka bir işlem yapın.
            });
        }

    }

    const deleteEvent = async (event, eventId) => {
        event.stopPropagation()
        const token = JSON.parse(localStorage.getItem('user'))?.token

        await axios.delete(AppSettings.ServiceUrl + "/Event/RemoveEvent?eventId=" + eventId, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'

            }
        })
            .then(async (response) => {
                if (response?.data?.isSuccess) {
                   getEvents()
                }
            })
            .catch(error => {
                console.error(error);
            });


    }
    const handleName = (event) => {
        event.stopPropagation()
        setName(event.target.value)
    }

    const handleLocation = (event) => {
        event.stopPropagation()
        setLocation(event.target.value)
    }

    const handleTime = (event) => {
        event.stopPropagation()
        setTime(event.target.value)
    }

    const handleBiletixLink = (event) => {
        event.stopPropagation()
        setBiletixLink(event.target.value)
    }

    const handleDate = (event) => {
        event.stopPropagation()
        setDate(event.target.value)
    }


    const getEvents = async () => {
        const response = await axios.get(AppSettings.ServiceUrl + '/Event/GetEvents')
        const resp = response.data

        if (resp?.isSuccess) {
            // setAllEvents(resp.data)

            var newEvents = []
            resp.data.map(event => {
                var newEvent = {
                    id: event.id,
                    location: event.location,
                    time: event.time,
                    biletixLink: event.biletixLink,
                    date: convertDate(event.date),
                    name: event.name
                }
                newEvents.push(newEvent)
            })
            setAllEvents(newEvents)
        }

    }
    useEffect(() => {
        getEvents()
    }, [])
    const handleSave = async (e) => {
        e.stopPropagation()
        const data = {
            name: name,
            date: date,
            location: location,
            time: time,
            biletixLink: biletixLink
        }
        const API_BASE_URL = Url + "/api"
        const token = JSON.parse(localStorage.getItem('user'))?.token
        const response = await axios.post(API_BASE_URL + '/Event/AddEvent',
            data,
            {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            }
        )
        const resp = response.data

        if (resp?.isSuccess) {
            setNewEvent(false)
            getEvents()
        }
    }

    const handleCancel = (e) => {
        e.stopPropagation()
        setNewEvent(false)
    }

    return (
        <div style={{ paddingTop: 200, paddingBottom: 100 }}>
            {isAdmin &&
                <div style={{ textAlign: "center" }}>
                    <MDBBtn
                        outline
                        className='me-1 px-5 my-3'
                        color='primary'
                        size='lg'
                        onClick={() => setNewEvent(true)}
                    >
                        Create New Event
                    </MDBBtn>
                </div>
            }
            {newEvent &&
                // <div style={{flex: 1, textAlign: "center"}}>
                //     <div style={{width: 200}}> 
                //     <input
                //         className='card-title'
                //         type="text"
                //         value={"newGameTitle"}
                //         onClick={(event) => { event.stopPropagation() }}
                //         // onChange={handleNewGameTitleChange}
                //     />
                //     </div>
                // </div>
                <div style={{ flex: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 200 }}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            // className='card-title'
                            type="text"
                            value={name}
                            onClick={(event) => { event.stopPropagation() }}
                            onChange={handleName}
                        />

                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            // className='card-title'
                            type="text"
                            value={location}
                            onClick={(event) => { event.stopPropagation() }}
                            onChange={handleLocation}
                        />

                        <label htmlFor="time">Time</label>
                        <input
                            id="time"
                            // className='card-title'
                            placeholder='20.00'
                            type="text"
                            value={time}
                            onClick={(event) => { event.stopPropagation() }}
                            onChange={handleTime}
                        />
                        <label htmlFor="date">Date</label>

                        <input
                            id="date"
                            placeholder='DD-MM-YYYY'
                            // className='card-title'
                            type="text"
                            value={date}
                            onClick={(event) => { event.stopPropagation() }}
                            onChange={handleDate}
                        />

                        <label htmlFor="biletixLink">Biletix Link</label>
                        <input
                            id="biletixLink"
                            // className='card-title'
                            type="text"
                            value={biletixLink}
                            onClick={(event) => { event.stopPropagation() }}
                            onChange={handleBiletixLink}
                        />
                        <MDBBtn
                            outline
                            className='me-1 px-5 my-2'
                            color='primary'
                            size='md'
                            onClick={(e) => handleSave(e)}
                        >
                            Save
                        </MDBBtn>
                        <MDBBtn
                            outline
                            className='me-1 px-5 my-2'
                            color='danger'
                            size='md'
                        onClick={(e) => handleCancel(e)}
                        >
                            Cancel
                        </MDBBtn>
                    </div>
                </div>


            }
            <RevoCalendar
                languages={translations}
                lang="turkish"

                // events={info.eventList}
                events={allEvents}
                style={{
                    backgroundColor: "white",
                    // borderRadius: "5px",
                    // border: "5px solid #4F6995",
                    width: "80%",
                    margin: "auto",
                }}
                highlightToday={true}
                // lang="tr"
                primaryColor="black"
                secondaryColor="white"
                todayColor="black"
                textColor="black"
                indicatorColor="black"
                animationSpeed={300}
                sidebarWidth={180}
                detailWidth={280}
                showDetailToggler={true}
                showSidebarToggler={true}
                onePanelAtATime={false}
                allowDeleteEvent={false}
                allowAddEvent={true}
                openDetailsOnDateSelection={true}
                timeFormat24={true}
                showAllDayLabel={false}
                sidebarDefault={!isMobile()}
                detailDefault={false}
                detailDateFormat="DD/MM/YYYY"
                dateSelected={dateSelectedFunction}
            // deleteEvent
            // ={
            //     deleteEvent
            // }
            // addEvent
            // ={
            //     addEvent
            // }
            />
        </div>
    )
}