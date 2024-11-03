const WeatherDisplay = ({ weathericon, weatherData, countryName }) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  } else {
    const weathercode = weatherData.daily.weather_code[0];
    const image = weathericon(weathercode);

    const display = (countryName) => {
      return countryName;
    };
    return (
      <div className="main-weather-display">
        <div className="weather-display">
          <h2>{display(countryName)}</h2>
          <h3>Chance of rain: {weatherData.daily.rain_sum[0]}%</h3>
          <div className="temp">
            {" "}
            <p>{Math.ceil(weatherData.daily.temperature_2m_max[0])}</p>{" "}
          </div>
        </div>
        <div className="weather-icon-display">
          <img src={image} alt="weather-display" />
        </div>
      </div>
    );
  }
};

export default WeatherDisplay;
