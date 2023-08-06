import React from "react";

export default  function FormatDate() {
    let currentDate = null;
    let now = new Date();
    let currentWeekDay = new Intl.DateTimeFormat("en-US", {
        weekday: "long"
    }).format(now);
    let currentMonth = now.toLocaleString("en-us", { month: "long" });
    let currentDay = now.getDate();
    let hours = now.getMinutes();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let currentTime = `${now.getHours()}:${hours}`;
    currentDate = `${currentWeekDay},  ${currentMonth} ${currentDay}, ${currentTime}`;
    return (
        <div className="today-date">{currentDate}</div>
    );

}
