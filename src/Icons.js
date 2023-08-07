import React from "react";
import snow from "./images/snow.png";
import sunny from "./images/sunny.png";
import cloudySun from "./images/cloudy-sun.png";
import clouds from "./images/clouds.png";
import rain from "./images/rain.png";
import drizzle from "./images/drizzle.png";
import thunderstorm from "./images/storm.png";
import mist from "./images/fog.png";

export default function Icons({icon}) {
       let descriptionToLowercase = icon.toLowerCase();
    let iconUrl = "";
    switch (descriptionToLowercase) {
        case "clear":
        case "clear-sky-day":
            iconUrl = sunny;
            break;
        case "few-clouds-day":
            iconUrl = cloudySun;
            break;
        case "clouds":
        case "broken-clouds-day":
        case "scattered-clouds-day":
            iconUrl = clouds;
            break;
        case "rain":
        case"shower-rain-day":
            iconUrl = rain;
            break;
        case "drizzle":
        case "rain-day":
            iconUrl = drizzle;
            break;
        case "thunderstorm":
        case "thunderstorm-day":
            iconUrl = thunderstorm;
            break;
        case  "snow":
        case "snow-day":
            iconUrl = snow;
            break;
        case "mist":
        case "mist-day":
            iconUrl = mist;
            break;

    }
    return (
        <div className="col-3 weather-icon">
            <img className="weather-pic" src={iconUrl} alt=""/>
        </div>
    )
}
