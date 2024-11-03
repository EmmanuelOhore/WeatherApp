import React from "react";
import DayCast from "./smallerComponents/dayCast";

const HomeForcast = ({ weatherData, weathericon, weatherDescription }) => {
  const dailyweather = () => {
    const forcast = [];

    if (!weatherData) {
      console.error("weatherData or weatherData.hourly is undefined");
      return [];
    }
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
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

  const homeForcast = dailyweather();
  return (
    <>
      <div className="weather-summary-details">
        <h2>7-DAY FORCAST</h2>
        <div className="casts-container">
          {homeForcast.map(({ day, code, time }) => {
            return (
              <DayCast
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

export default HomeForcast;
