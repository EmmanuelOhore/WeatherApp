import React from "react";
import CityQuickSearch from "./smallerComponents/cityQuickSearch";
import WeatherDisplay from "./smallerComponents/weather-display";
const Mapforcast = ({
  handlecityasign,
  onsubmit,
  weathericon,
  weatherData,
  countryName,
}) => {
  return (
    <div className="map-summary">
      <WeatherDisplay
        countryName={countryName}
        weatherData={weatherData}
        weathericon={weathericon}
      />

      <div className="city-selection map-seclection">
        <CityQuickSearch
          handlecityasign={handlecityasign}
          onsubmit={onsubmit}
          cityName="Abuja"
          time={"10:23"}
        />
        <CityQuickSearch
          handlecityasign={handlecityasign}
          onsubmit={onsubmit}
          cityName="Lagos"
          time={"10:23"}
        />
      </div>
    </div>
  );
};

export default Mapforcast;
