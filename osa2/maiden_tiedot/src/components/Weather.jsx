import { useState,useEffect } from "react"
import axios from "axios"

const Weather = ({ country }) => {
  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_URL
  const [weather, setWeather] = useState(null)

  useEffect(() => {
  axios
      .get(`${BASE_URL}
lat=${country.capitalInfo.latlng[0]}&\
lon=${country.capitalInfo.latlng[1]}&\
appid=${API_KEY}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)})
  }, [])

  if (!weather) {
    return <p>Loading weather...</p>
  }

  return(
    <>
    <h2>Weather in {country.capital}</h2>
    <p>Temperature {(Math.round((weather.main.temp - 273.15)* 100) / 100)} Celsius</p>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
    <p>Wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather