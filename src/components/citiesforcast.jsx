import React from "react";
import Forcast from "./smallerComponents/forcast";
import DayCast from "./smallerComponents/dayCast";
import WeatherDisplay from "./smallerComponents/weather-display";

const CitiesForcast = ({
  weathericon,
  weatherData,
  countryName,
  weatherDescription,
}) => {
  const getNextHourlyTemperatures = () => {
    if (!weatherData || !weatherData.hourly) {
      console.error("weatherData or weatherData.hourly is undefined");
      return <div>Loading weather data...</div>;
    }

    const now = new Date();
    const currentHour = now.getHours();
    const nextHour = Math.ceil(currentHour / 3) * 3;

    const nextTemperatures = [];
    for (let i = 0; i < 3; i++) {
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

      const weatherIcon = weathericon(hourWeatherCode);

      nextTemperatures.push({
        time: formattedTime,
        temperature: hourTemperature,
        icon: weatherIcon,
      });
    }

    return nextTemperatures;
  };
  const dailyweather = () => {
    const forcast = [];

    if (!weatherData) {
      console.error("weatherData or weatherData.hourly is undefined");
      return [];
    }
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 3; i++) {
      let dailytemprature = weatherData.daily.temperature_2m_max[i];
      let dailyWeatherCode = weatherData.daily.weather_code[i];
      let dailytime = weatherData.daily.time[i];
      const date = new Date(dailytime);

      const dayIndex = date.getUTCDay();
      const dayName = dayNames[dayIndex];
      forcast.push({
        temp: dailytemprature,
        code: dailyWeatherCode,
        time: dailytime,
        day: dayName,
      });
    }

    return forcast;
  };

  const nextHourlyTemperatures = getNextHourlyTemperatures();
  const homeForcast = dailyweather();

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }
  return (
    <>
      <WeatherDisplay
        countryName={countryName}
        weatherData={weatherData}
        weathericon={weathericon}
      />
      <div className="city-forcast">
        <h2>TODAYS'S FORECAST</h2>
        <div className="forcast-summary">
          {nextHourlyTemperatures.map(({ time, temperature, icon }, index) => (
            <Forcast
              key={index}
              time={time}
              weatherIcon={icon}
              degree={temperature}
            />
          ))}
        </div>
      </div>
      <div className="citie-summary-details">
        <h2>3-DAY FORCAST</h2>
        <div className="casts-container">
          {homeForcast.map(({ day, code }, index) => {
            return (
              <DayCast
                key={index}
                weatherIcon={weathericon(code)}
                weatherType={weatherDescription(code)}
                date={day}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CitiesForcast;
