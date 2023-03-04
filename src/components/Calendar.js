import { IDLE_FETCHER } from '@remix-run/router';
import React, { useEffect } from 'react';
import RevoCalendar from "revo-calendar";
import { info } from './Data/info';

const locationIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>'
const timeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>'


export default function Calendar() {
    const convertDate = (date) => {
        date = date.split("-");
        var newDate = new Date(date[2], date[1] - 1, date[0]);
        return newDate.getTime();
    }
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }
    var eventList = [
        // {
        //     name: "Buyout",
        //     date: Date.now(),
        //     allDay: true,
        // },
        {
            name: "Otofaji",
            date: convertDate("14-01-2023"),
            extra: {
                icon: "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09           4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
                text: "7 People",
            },
        },
        {
            name: "Otofaji",
            date: convertDate("14-02-2023"),
            allDay: true
            // extra: {
            //     allDay: true,
            //     icon: "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09           4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
            //     text: "7 People",
            // },
        },
        {
            name: "Otofaji",
            date: convertDate("24-02-2023"),
            allDay: true,
            // extra: {
            //     icon: "M 12 9.312 l -1.762 0.491 l 1.562 0.881 l -0.491 0.871 l -1.562 -0.881 l 0.491 1.762 l -0.963 0.268 l -0.76 -2.724 l -2.015 -1.126 v 1.939 l 2 2 l -0.707 0.707 l -1.293 -1.293 v 1.793 h -1 v -1.793 l -1.293 1.293 l -0.707 -0.707 l 2 -2 v -1.939 l -2.015 1.126 l -0.761 2.724 l -0.963 -0.268 l 0.491 -1.762 l -1.562 0.882 l -0.491 -0.871 l 1.562 -0.881 l -1.761 -0.492 l 0.269 -0.962 l 2.725 0.76 l 1.982 -1.11 l -1.983 -1.109 l -2.724 0.759 l -0.269 -0.962 l 1.762 -0.491 l -1.563 -0.882 l 0.491 -0.871 l 1.562 0.881 l -0.49 -1.762 l 0.963 -0.269 l 0.76 2.725 l 2.015 1.128 v -1.94 l -2 -2 l 0.707 -0.707 l 1.293 1.293 v -1.793 h 1 v 1.793 l 1.293 -1.293 l 0.707 0.707 l -2 2 v 1.94 l 2.016 -1.127 l 0.76 -2.725 l 0.963 0.269 l -0.492 1.761 l 1.562 -0.881 l 0.491 0.871 l -1.562 0.881 l 1.762 0.492 l -0.269 0.962 l -2.725 -0.76 l -1.982 1.11 l 1.982 1.109 l 2.725 -0.76 l 0.269 0.963 Z m 4 -5.812 v 7.525 c 0 1.57 -0.514 2.288 -1.41 3.049 c -1.011 0.859 -1.59 2.107 -1.59 3.426 c 0 2.481 2.019 4.5 4.5 4.5 s 4.5 -2.019 4.5 -4.5 c 0 -1.319 -0.579 -2.567 -1.589 -3.426 c -0.897 -0.762 -1.411 -1.48 -1.411 -3.049 v -7.525 c 0 -0.827 -0.673 -1.5 -1.5 -1.5 s -1.5 0.673 -1.5 1.5 Z m 5 0 v 7.525 c 0 0.587 0.258 1.145 0.705 1.525 c 1.403 1.192 2.295 2.966 2.295 4.95 c 0 3.59 -2.909 6.5 -6.5 6.5 s -6.5 -2.91 -6.5 -6.5 c 0 -1.984 0.892 -3.758 2.295 -4.949 c 0.447 -0.381 0.705 -0.94 0.705 -1.526 v -7.525 c 0 -1.934 1.567 -3.5 3.5 -3.5 s 3.5 1.566 3.5 3.5 Z m 0 14 c 0 1.934 -1.567 3.5 -3.5 3.5 s -3.5 -1.566 -3.5 -3.5 c 0 -1.141 0.599 -2.084 1.393 -2.781 c 1.01 -0.889 1.607 -1.737 1.607 -3.221 v -0.498 h 1 v 0.498 c 0 1.486 0.595 2.33 1.607 3.221 c 0.794 0.697 1.393 1.64 1.393 2.781 Z",
            //     text: "7 People",
            // },
            // extra: {
            //     icon: "M 12 9.312 l -1.762 0.491 l 1.562 0.881 l -0.491 0.871 l -1.562 -0.881 l 0.491 1.762 l -0.963 0.268 l -0.76 -2.724 l -2.015 -1.126 v 1.939 l 2 2 l -0.707 0.707 l -1.293 -1.293 v 1.793 h -1 v -1.793 l -1.293 1.293 l -0.707 -0.707 l 2 -2 v -1.939 l -2.015 1.126 l -0.761 2.724 l -0.963 -0.268 l 0.491 -1.762 l -1.562 0.882 l -0.491 -0.871 l 1.562 -0.881 l -1.761 -0.492 l 0.269 -0.962 l 2.725 0.76 l 1.982 -1.11 l -1.983 -1.109 l -2.724 0.759 l -0.269 -0.962 l 1.762 -0.491 l -1.563 -0.882 l 0.491 -0.871 l 1.562 0.881 l -0.49 -1.762 l 0.963 -0.269 l 0.76 2.725 l 2.015 1.128 v -1.94 l -2 -2 l 0.707 -0.707 l 1.293 1.293 v -1.793 h 1 v 1.793 l 1.293 -1.293 l 0.707 0.707 l -2 2 v 1.94 l 2.016 -1.127 l 0.76 -2.725 l 0.963 0.269 l -0.492 1.761 l 1.562 -0.881 l 0.491 0.871 l -1.562 0.881 l 1.762 0.492 l -0.269 0.962 l -2.725 -0.76 l -1.982 1.11 l 1.982 1.109 l 2.725 -0.76 l 0.269 0.963 Z m 4 -5.812 v 7.525 c 0 1.57 -0.514 2.288 -1.41 3.049 c -1.011 0.859 -1.59 2.107 -1.59 3.426 c 0 2.481 2.019 4.5 4.5 4.5 s 4.5 -2.019 4.5 -4.5 c 0 -1.319 -0.579 -2.567 -1.589 -3.426 c -0.897 -0.762 -1.411 -1.48 -1.411 -3.049 v -7.525 c 0 -0.827 -0.673 -1.5 -1.5 -1.5 s -1.5 0.673 -1.5 1.5 Z m 5 0 v 7.525 c 0 0.587 0.258 1.145 0.705 1.525 c 1.403 1.192 2.295 2.966 2.295 4.95 c 0 3.59 -2.909 6.5 -6.5 6.5 s -6.5 -2.91 -6.5 -6.5 c 0 -1.984 0.892 -3.758 2.295 -4.949 c 0.447 -0.381 0.705 -0.94 0.705 -1.526 v -7.525 c 0 -1.934 1.567 -3.5 3.5 -3.5 s 3.5 1.566 3.5 3.5 Z m 0 14 c 0 1.934 -1.567 3.5 -3.5 3.5 s -3.5 -1.566 -3.5 -3.5 c 0 -1.141 0.599 -2.084 1.393 -2.781 c 1.01 -0.889 1.607 -1.737 1.607 -3.221 v -0.498 h 1 v 0.498 c 0 1.486 0.595 2.33 1.607 3.221 c 0.794 0.697 1.393 1.64 1.393 2.781 Z",
            //     text: "7 People",
            // },
        },
        {
            // sc-iBYQkv hbdeeM
            name: "Otofaji",
            date: convertDate("28-02-2023"),
            allDay: true,
            // extra: {
            //     icon: "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09           4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
            //     text: "7 People",
            // },
        }
    ];
    // var myDate = "26-01-2023";
    // myDate = myDate.split("-");
    // var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    // console.log(newDate.getTime());
    // console.log("dat:e ", Date.now())

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
        var date = e.day + "" + (e.month + 1) + "" + e.year
        const test = document.getElementsByClassName("sc-iBYQkv hbdeeM");
        console.log("test: ", test)
        if (test.length > 0) {
            var eventInfo = info.eventInfos.find(x => x.id === date);
            if(eventInfo)
                document.getElementsByClassName("sc-iBYQkv hbdeeM")[0].innerHTML = '<p>' + eventInfo.name + '</p><div></div>' + locationIcon + '<span style="padding-left: 10px; margin-bottom: 5px">' + eventInfo.location + '</span><div></div>' + timeIcon + '<span style="padding-left: 10px; margin-bottom: 5px">' + eventInfo.time + '</span><div></div><form action="' + eventInfo.biletixLink + '"><button style="background-color: black; border-radius: 0; width: 100px">Bilet AL</button></from>'
        }
    }
    return (
        <div style={{ paddingTop: 200, paddingBottom: 100 }}>
            <RevoCalendar
                languages={translations}
                lang="turkish"

                events={info.eventList}
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