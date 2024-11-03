import React from "react";
import Searchbar from "./smallerComponents/sreachbar";
import CityQuickSearch from "./smallerComponents/cityQuickSearch";
import "../styles/cities.css";

const Cities = ({
  weathericon,
  cityweatherData,
  weatherData,
  citiesearch,
  countryName,
  onsubmit,
  handlecityasign,
}) => {
  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }
  const weathercode = weatherData.daily.weather_code[0];
  const image = weathericon(weathercode);
  return (
    <>
      <div className="city-search">
        <Searchbar
          onsubmit={onsubmit}
          citiesearch={citiesearch}
          countryName={countryName}
        />
      </div>
      <div className="city-selection">
        <div className="city first-city">
          <div className="left-hand">
            <img src={image} alt="sun" />
            <div className="left-hand-text">
              <h2>{countryName}</h2>
              <p>10:23</p>
            </div>
          </div>
          <div className="right-hand">
            <h3>{Math.ceil(weatherData.daily.temperature_2m_max[0])}</h3>
          </div>
        </div>

        <CityQuickSearch
          handlecityasign={handlecityasign}
          cityName="Iceland"
          onsubmit={onsubmit}
          time={"10:23"}
        />
        <CityQuickSearch
          handlecityasign={handlecityasign}
          cityName="Japan"
          onsubmit={onsubmit}
          time={"10:23"}
        />
        <CityQuickSearch
          handlecityasign={handlecityasign}
          onsubmit={onsubmit}
          cityName="Athens"
          time={"10:23"}
        />
      </div>
    </>
  );
};

export default Cities;
