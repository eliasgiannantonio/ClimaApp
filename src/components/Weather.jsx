import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

function Weather() {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons  = {
        "01d": clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,
    };

    const search = async (city) => {
        if (city === "") {
            alert("Ingresa el nombre de una ciudad");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert("No se ha encontrado la ciudad");
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humedad: data.main.humidity,
                viento: data.wind.speed,
                temperatura: Math.floor(data.main.temp),
                ubicacion: data.name,
                icon: icon
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error obteniendo datos del clima");
        }
    };

    useEffect(() => {
        search("Cordoba");
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            search(inputRef.current.value);
        }
    };

    return (
        <div className='weather'>
            <div className="search-bar">
                <input 
                    ref={inputRef} 
                    type="text" 
                    placeholder='Buscar' 
                    onKeyPress={handleKeyPress}
                />
                <img 
                    onClick={() => search(inputRef.current.value)} 
                    src={search_icon} 
                    alt="Buscar" 
                />
            </div>
            {weatherData ? (
                <>
                    <img className="weather-icon" src={weatherData.icon} alt="" />
                    <p className='temperatura'>{weatherData.temperatura}°C</p>
                    <p className='ubicacion'>{weatherData.ubicacion}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="" />
                            <div>
                                <p>{weatherData.humedad} %</p>
                                <span>Humedad</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div>
                                <p>A {weatherData.viento} Km/h</p>
                                <span>Viento</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : <></>}
        </div>
    );
}

export default Weather;
