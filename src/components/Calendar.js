import { IDLE_FETCHER } from '@remix-run/router';
import React, { useEffect } from 'react';
import RevoCalendar from "revo-calendar";
import { info } from './Data/info';

const locationIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>'
const timeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>'


export default function Calendar() {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }


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
        const test = document.getElementsByClassName("sc-iBYQkv");
        if (test.length > 0) {
            var eventInfo = info.eventInfos.find(x => x.id === date);
            if(eventInfo)
                document.getElementsByClassName("sc-iBYQkv")[0].innerHTML = '<p>' + eventInfo.name + '</p><div></div>' + locationIcon + '<span style="padding-left: 10px; margin-bottom: 5px">' + eventInfo.location + '</span><div></div>' + timeIcon + '<span style="padding-left: 10px; margin-bottom: 5px">' + eventInfo.time + '</span><div></div><form action="' + eventInfo.biletixLink + '"><button style="background-color: black; border-radius: 0; width: 100px">Bilet AL</button></from>'
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