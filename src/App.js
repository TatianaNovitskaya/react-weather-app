import React, {useState, useEffect} from 'react';

import heat from "./images/heat.png";
import drop from "./images/drop.png";
import wind from "./images/wind.png";
import pin from "./images/pin.png";
import search from "./images/search.png";
import './App.css';
import axios from 'axios';
import FormatDate from "./Date";
import Icons from "./Icons"

export default function App() {
    const [value, setValue] = useState(null);
    const [city, setCity] = useState("");
    const [unit, setUnit] = useState("celsius");
    const [celsiusTemperature, setCelsiusTemperature] = useState(null)
    const [weatherData, setWeatherData] = useState({
        temperature: 0,
        humidity: 0,
        feels_like: 0,
        wind: 0,
        description: "",
        icon: ""
    })
    const apiKey = "a9573fb89158f89d83ceea2936963385";
    function getCityInfo(response) {
        setCity(response.data.name);
        setCelsiusTemperature(toggleTemperature(response.data.main.temp));
        setWeatherData({

            humidity: response.data.main.humidity,
            feels_like: response.data.main.feels_like,
            wind: response.data.wind.speed,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].main
        });

    }

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
    function getPosition(position) {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;
        getAxiosUrl(apiUrl)

    }

    function handleSubmit(e) {
        e.preventDefault();
        if (value) {
            setCity(value);
        }

    }
    useEffect(() => {
        if (city) {
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            // eslint-disable-next-line
            getAxiosUrl(apiUrl)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city]);
    useEffect(() => {
        // eslint-disable-next-line
        getCurrentLocation();
        localStorage.setItem("temperature","celsius");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function getValue(e) {
        setValue(e.target.value);
    }

    function getStorageTemperarure() {
        return localStorage.getItem("temperature");
    }
    function getCurrentTemperature(response) {
        setCelsiusTemperature(toggleTemperature(response.data.main.temp));
    }
    function displayFahrengeit() {
        if (getStorageTemperarure() === "fahrenheit") {
            return;
        }

        let fahrengeitTemperature = conversionFahrenheit(celsiusTemperature)
        setCelsiusTemperature(fahrengeitTemperature)
        localStorage.setItem("temperature","fahrenheit");
        setUnit('fahrenheit')
    }

    function displayCelsius() {
        if (getStorageTemperarure() === "celsius") {
            return;
        }
        setUnit('celsius')
        let convertFahrenheitToCelsius =  Math.round((celsiusTemperature - 32) * 5/9);
        setCelsiusTemperature(convertFahrenheitToCelsius)
        localStorage.setItem("temperature","celsius");
    }

    function conversionFahrenheit(num) {
        return Math.round((num * 9 / 5) + 32);
    }

    function conversionCelsius(num) {
        return Math.round(num)
    }

    function toggleTemperature(number) {

        if(getStorageTemperarure() === "fahrenheit"){
            return conversionFahrenheit(number)
        } else {
            return conversionCelsius(number)
        }

    }

    function getAxiosUrl(apiUrl) {
        axios.get(apiUrl).then((response) => {
            getCurrentTemperature(response);
            getCityInfo(response);

            if(getStorageTemperarure() === "fahrenheit"){
                displayFahrengeit();
            }
        })

    }

    console.log(unit);

    return (
        <div className="App">
            <div className="container">
                <div className="weather-app">
                    <div className="row weather-app-header ">
                        <form className="col-12 col-lg-12 search " onSubmit={handleSubmit}>
                            <div className="col-2 col-lg-3 current-position" onClick={getCurrentLocation}>
                                <p>Current city</p>
                            </div>
                            <input
                                type="text"
                                className="col-8 col-lg-9 input-search"
                                placeholder="Enter city..."
                                onChange={getValue}
                            />

                            <div className="btn-search">
                                <input type="submit" value=""/>
                                <img src={search} alt=""/>
                            </div>
                        </form>
                        <div className="col-12 col-lg-12">
                            <div className="row">
                                <div className="col-2 pin-img">
                                    <img src={pin} alt="pin"/>
                                </div>
                                <div className="col-10 location">
                                    <span className="city">{city}</span>
                                    <FormatDate/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row weather-app-main ">
                        <Icons icon={weatherData.icon}/>
                        <div className="col-3 weather-temp">
                            <p className="show-temperature">{Math.round(celsiusTemperature)}°</p>
                            <p className="weather-temp-description text-capitalize">{weatherData.description}</p>
                        </div>
                        <div className="col-1 weather-convector">
                            <p className={`${unit}`  === 'celsius' ? 'celsius active-convert' : 'celsius'} data-degree="celsius" onClick={displayCelsius}>
                                C
                            </p>
                            <div className="delimiter"></div>
                            <p className={`${unit}` === 'fahrenheit' ? 'fahrenheit active-convert' : 'fahrenheit'} data-degree="fahrenheit" onClick={displayFahrengeit}>
                                F
                            </p>
                        </div>
                        <div className="col-12 col-lg-4 weather-info">
                            <div className="col-12 weather-info-item">
                                <div className="col-1 weather-info-icon">
                                    <img src={heat} alt=""/>
                                </div>
                                <div className="col-7 weather-info-txt ">
                                    <p>feels like</p>
                                </div>
                                <div className="col-4 weather-info-value ">
                                    <p className="feels-like">{Math.round(weatherData.feels_like)}°</p>
                                </div>
                            </div>
                            <div className="col-12 weather-info-item">
                                <div className="col-1 weather-info-icon">
                                    <img src={drop} alt=""/>
                                </div>
                                <div className="col-7 weather-info-txt ">
                                    <p>humidity</p>
                                </div>
                                <div className="col-4 weather-info-value">
                                    <p className="humidity">{weatherData.humidity}%</p>
                                </div>
                            </div>
                            <div className="col-12 weather-info-item">
                                <div className="col-1 weather-info-icon">
                                    <img src={wind} alt=""/>
                                </div>
                                <div className="col-7 weather-info-txt">
                                    <p>wind</p>
                                </div>
                                <div className="col-4 weather-info-value">
                                    <p className="wind">{Math.round(weatherData.wind)}km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

