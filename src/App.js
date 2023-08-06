import React, {useState, useEffect} from 'react';
import clouds from "./images/clouds.png";
import heat from "./images/heat.png";
import drop from "./images/drop.png";
import wind from "./images/wind.png";
import pin from "./images/pin.png";
import search from "./images/search.png";
import './App.css';
import axios from 'axios';
import FormatDate from "./Date"

export default function App() {
    const [value, setValue] = useState(null);
    const [city, setCity] = useState("Paris");
    const [weatherData, setWeatherData] = useState({})
    const apiKey = "a9573fb89158f89d83ceea2936963385";
    function getCityInfo(response) {
        setWeatherData({
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            feels_like: response.data.main.feels_like,
            wind: response.data.wind.speed,
            description: response.data.weather[0].description,
        });

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
            axios.get(apiUrl).then(getCityInfo);
        }
    }, [city]);

    function getValue(e) {
        setValue(e.target.value);
    }

    return (
        <div className="App">
            <div className="container">
                <div className="weather-app">
                    <div className="row weather-app-header ">
                        <form className="col-12 col-lg-12 search " onSubmit={handleSubmit}>
                            <div className="col-2 col-lg-3 current-position">
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
                        <div className="col-3 weather-icon">
                            <img className="weather-pic" src={clouds} alt=""/>
                        </div>
                        <div className="col-3 weather-temp">
                            <p className="show-temperature">{Math.round(weatherData.temperature)}°</p>
                            <p className="weather-temp-description text-capitalize">{weatherData.description}</p>
                        </div>
                        <div className="col-1 weather-convector">
                            <p className="celsius active-convert " data-degree="celsius">
                                C
                            </p>
                            <div className="delimiter"></div>
                            <p className="fahrenheit " data-degree="fahrenheit">
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

