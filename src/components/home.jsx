import React from "react";
import Searchbar from "./smallerComponents/sreachbar";
import Forcast from "./smallerComponents/forcast";
import WeatherDisplay from "./smallerComponents/weather-display";

const Home = ({
  weathericon,
  weatherData,
  citiesearch,
  countryName,
  onsubmit,
  getNextHourlyTemperatures,
}) => {
  const nextHourlyTemperatures = weatherData ? getNextHourlyTemperatures() : [];
  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }
  return (
    <>
      {" "}
      <header className="weather-header">
        <Searchbar
          onsubmit={onsubmit}
          citiesearch={citiesearch}
          countryName={countryName}
        />
        <WeatherDisplay
          countryName={countryName}
          weatherData={weatherData}
          weathericon={weathericon}
        />
      </header>
      <div className="weather-body-section">
        <div className="forcast">
          <h2>TODAYS'S FORECAST</h2>

          {/* forecast start */}
          <div className="forcast-summary">
            {nextHourlyTemperatures.map(
              ({ time, temperature, icon }, index) => (
                <Forcast
                  key={index}
                  time={time}
                  weatherIcon={icon}
                  degree={temperature}
                />
              )
            )}
          </div>
          {/* forcast end */}
        </div>

        {/* airc conditions start */}
        <div className="air-condition-section">
          <div className="head">
            <h2>AIR CONDITIONS</h2>
          </div>

          <div className="air-parameters">
            <div className="top">
              <div className="parameters real">
                <div className="heading">
                  <i class="fa-solid fa-temperature-three-quarters"></i>
                </div>
                <div className="parameter real-feal">
                  <h2>Real Feel</h2>
                  <h3>{weatherData.daily.temperature_2m_max[0]}°C</h3>
                </div>
              </div>

              <div className="parameters wind">
                <div className="heading">
                  <i class="fa-solid fa-wind"></i>
                </div>
                <div className="parameter">
                  <h2>wind</h2>
                  <h3>{weatherData.daily.wind_speed_10m_max[0]} km/h</h3>
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="parameters rain">
                <div className="heading">
                  <i class="fa-solid fa-droplet"></i>
                </div>
                <div className="parameter">
                  <h2>Chances of rain </h2>
                  <h3> {weatherData.daily.rain_sum[0]}%</h3>
                </div>
              </div>

              <div className="parameters uv">
                <div className="heading">
                  <i class="fa-solid fa-sun"></i>
                </div>
                <div className="parameter">
                  <h2>UV index</h2>
                  <h3>{weatherData.daily.uv_index_max[0]} mW/m2</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
