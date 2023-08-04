import clouds from "./images/clouds.png";
import heat from "./images/heat.png";
import drop from "./images/drop.png";
import wind from "./images/wind.png";
import pin from "./images/pin.png";
import search from "./images/search.png";
import './App.css';


export default function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="weather-app">
                    <div className="row weather-app-header ">
                        <form className="col-12 col-lg-12 search ">
                            <div className="col-2 col-lg-3 current-position">
                                <p>Current city</p>
                            </div>
                            <input
                                type="text"
                                className="col-8 col-lg-9 input-search"
                                placeholder="Enter city..."

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
                                    <span className="city">Toronto</span>

                                    <p className="today-date">Saturday, July 8, 17:41</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row weather-app-main ">
                        <div className="col-3 weather-icon">
                            <img className="weather-pic" src={clouds} alt=""/>
                        </div>
                        <div className="col-3 weather-temp">
                            <p className="show-temperature">10°</p>
                            <p className="weather-temp-description">Cloudy</p>
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
                                    <p className="feels-like">19°</p>
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
                                    <p className="humidity">45%</p>
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
                                    <p className="wind">12 km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

