import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "./sidebar";
import Cities from "./cities";
import CitiesForcast from "./citiesforcast";
import Home from "./home";
import Map from "./map";
import HomeForcast from "./HomeForcast";
import Mapforcast from "./mapforcast";
import "../styles/weatherApp.css";
import sun from "../assets/sun.png";
import cloudysun from "../assets/cloudysun.png";
import cloud from "../assets/cloud.png";
import snowy from "../assets/snowy.png";
import rainy from "../assets/raining.png";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [countryName, setCountryName] = useState("Kansas,United States");
  const [latitude, setLatidue] = useState(40.4167);
  const [longitude, setlongitude] = useState(3.7033);
  useEffect(
    function () {
      async function fetchWeatherData() {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weather_code,uv_index_max,rain_sum,wind_speed_10m_max&hourly=temperature_2m,weather_code,wind_speed_10m,uv_index&timezone=auto`
        );
        const data = await res.json();

        setWeatherData(data);
        console.log("Country Name Updated:", countryName);
      }
      fetchWeatherData();
    },
    [latitude, longitude, countryName]
  );

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
  const weatherDescription = (weatherCode) => {
    if (weatherCodeToIcon.sunny.includes(weatherCode)) return "Sunny";
    if (weatherCodeToIcon.cloudy.includes(weatherCode)) return "Cloudy";
    if (weatherCodeToIcon.raining.includes(weatherCode)) return "Rainy";
    if (weatherCodeToIcon.sunnyCloudy.includes(weatherCode))
      return "ThunderStorm";
    if (weatherCodeToIcon.snowy.includes(weatherCode)) return "Snow";
    return "Sunny";
  };
  const geourl = `https://api.opencagedata.com/geocode/v1/json?q=${countryName}&key=e64bf69308f049d9bbb6325a5bb91ba9&pretty=1`;

  const handleCitieSearch = async ({ target }) => {
    if (target.name === "searchbar") {
      return setCountryName(target.value);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(geourl);
      const data1 = await responce.json();
      const newlatitude = data1.results[0].geometry.lat;
      const newlongitude = data1.results[0].geometry.lng;

      setLatidue(newlatitude);
      setlongitude(newlongitude);
    } catch (error) {
      console.log("error fectyhing data :", error);
    }
  };

  const getNextHourlyTemperatures = () => {
    if (!weatherData || !weatherData.hourly) {
      console.error("weatherData or weatherData.hourly is undefined");
      return [];
    }

    const now = new Date();
    const currentHour = now.getHours();
    const nextHour = Math.ceil(currentHour / 3) * 3;

    const nextTemperatures = [];
    for (let i = 0; i < 7; i++) {
      const hourIndex = (nextHour + i * 3) % 24;

      // Check if temperature data exists at hourIndex
      if (
        !weatherData.hourly.temperature_2m ||
        !weatherData.hourly.weather_code ||
        weatherData.hourly.temperature_2m[hourIndex] === undefined ||
        weatherData.hourly.weather_code[hourIndex] === undefined
      ) {
        console.error("Temperature or weather code data is missing");
        return [];
      }

      const hourTemperature = weatherData.hourly.temperature_2m[hourIndex];
      const hourWeatherCode = weatherData.hourly.weather_code[hourIndex];
      const hourTime = new Date(now.setHours(hourIndex, 0, 0, 0));
      const formattedTime = hourTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const weatherIcon = getWeatherIcon(hourWeatherCode);

      nextTemperatures.push({
        time: formattedTime,
        temperature: hourTemperature,
        icon: weatherIcon,
      });
    }

    return nextTemperatures;
  };

  const handlecityasign = (cityname, e) => {
    setCountryName(cityname);
    handlesubmit(e);
  };
  const handleMapClick = async (event) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=e64bf69308f049d9bbb6325a5bb91ba9&pretty=1`
    );
    const data1 = await response.json();

    const countryname = () => {
      if (!data1.results || data1.results.length === 0) {
        console.error("No results found");
        return "Unknown location";
      }
      const { road, state, country } = data1.results[0].components;
      const arrparts = [];
      if (road && road !== "unnamed road") {
        arrparts.push(road);
      } else if (state) {
        arrparts.push(state);
      }
      arrparts.push(country);

      return arrparts.join(",");
    };
    setCountryName(countryname());
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLatidue(lat);
    setlongitude(lng);
  };
  return (
    <>
      <div className="weather-body">
        <div className="main-weather-conainer">
          {/* side bar start */}
          <SideBar />
          {/* side bar end */}

          {/* main start */}
          <div className="weather-main">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    countryName={countryName}
                    citiesearch={handleCitieSearch}
                    onsubmit={handlesubmit}
                    weatherData={weatherData}
                    weathericon={getWeatherIcon}
                    getNextHourlyTemperatures={getNextHourlyTemperatures}
                  />
                }
              />
              <Route
                path="/cities"
                element={
                  <Cities
                    countryName={countryName}
                    citiesearch={handleCitieSearch}
                    onsubmit={handlesubmit}
                    weatherData={weatherData}
                    weathericon={getWeatherIcon}
                    handlecityasign={handlecityasign}
                  />
                }
              />
              <Route
                path="/map"
                element={
                  <Map
                    countryName={countryName}
                    citiesearch={handleCitieSearch}
                    longitude={longitude}
                    latitude={latitude}
                    handleMapClick={handleMapClick}
                  />
                }
              />
            </Routes>
          </div>
          {/* main ends */}

          {/* weather summary starts */}
          <div className="weather-summary">
            <Routes>
              <Route
                path="/"
                element={
                  <HomeForcast
                    weatherData={weatherData}
                    weathericon={getWeatherIcon}
                    weatherDescription={weatherDescription}
                  />
                }
              />
              <Route
                path="/cities"
                element={
                  <CitiesForcast
                    countryName={countryName}
                    onsubmit={handlesubmit}
                    weatherData={weatherData}
                    weathericon={getWeatherIcon}
                    weatherDescription={weatherDescription}
                  />
                }
              />
              <Route
                path="/map"
                element={
                  <Mapforcast
                    countryName={countryName}
                    onsubmit={handlesubmit}
                    weatherData={weatherData}
                    weathericon={getWeatherIcon}
                    handlecityasign={handlecityasign}
                  />
                }
              />
            </Routes>
          </div>
          {/* weather summary ends */}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
