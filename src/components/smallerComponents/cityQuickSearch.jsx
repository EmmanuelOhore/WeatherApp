import React, { useEffect, useState } from "react";
import sun from "../../assets/sun.png";
import cloudysun from "../../assets/cloudysun.png";
import cloud from "../../assets/cloud.png";
import snowy from "../../assets/snowy.png";
import rainy from "../../assets/raining.png";

const CityQuickSearch = ({ cityName, onsubmit, time, handlecityasign }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const geocodeResponse = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=e64bf69308f049d9bbb6325a5bb91ba9&pretty=1`
        );
        const geocodeData = await geocodeResponse.json();
        const lat = geocodeData.results[0].geometry.lat;
        const lon = geocodeData.results[0].geometry.lng;
        fetchWeather(lat, lon);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    const fetchWeather = async (latitude, longitude) => {
      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weather_code,uv_index_max,rain_sum,wind_speed_10m_max&hourly=temperature_2m,weather_code,wind_speed_10m,uv_index&timezone=auto`
        );
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchCoordinates();
  }, [cityName]);

  if (!weatherData) return <p className="loading">Loading weather...</p>;

  const handleClick = (e) => {
    handlecityasign(cityName, e);
    onsubmit(e);
  };
  return (
    <>
      <div className="city " onClick={handleClick}>
        <div className="left-hand">
          <img
            src={getWeatherIcon(weatherData.daily.weather_code[0])}
            alt="sun"
          />
          <div className="left-hand-text">
            <h2>{cityName}</h2>
            <p>{time}</p>
          </div>
        </div>
        <div className="right-hand">
          <h3>{Math.ceil(weatherData.daily.temperature_2m_max[0])}</h3>
        </div>
      </div>
    </>
  );
};

const weatherCodeToIcon = {
  sunny: [0, 1, 2],
  cloudy: [3, 45, 48],
  raining: [51, 53, 55, 61, 63, 65, 80, 81, 82, 95],
  sunnyCloudy: [4, 80, 81, 82],
  snowy: [71, 73, 75, 77, 85, 86],
};
const getWeatherIcon = (weatherCode) => {
  if (weatherCodeToIcon.sunny.includes(weatherCode)) return sun;
  if (weatherCodeToIcon.cloudy.includes(weatherCode)) return cloud;
  if (weatherCodeToIcon.raining.includes(weatherCode)) return rainy;
  if (weatherCodeToIcon.sunnyCloudy.includes(weatherCode)) return cloudysun;
  if (weatherCodeToIcon.snowy.includes(weatherCode)) return snowy;
  return sun;
};

export default CityQuickSearch;
