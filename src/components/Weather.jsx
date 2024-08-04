import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

function Weather() {
  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" placeholder='Buscar' />
            <img src={search_icon} alt="" />
        </div>
        <img className="weather-icon" src={clear_icon} alt="" />
        <p className='temperatura'>16°C</p>
        <p className='ubicacion'>Villa Icho Cruz</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>91 %</p>
              <span>Humedad</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>A 3.6 Km/h</p>
              <span>Viento</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather