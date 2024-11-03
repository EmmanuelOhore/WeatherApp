import React from "react";

const Forcast = (props) => {
  const { time, weatherIcon, degree } = props;
  return (
    <div className="casting time">
      <h3>{time}</h3>
      <img src={weatherIcon} alt="cloud" />
      <p className="degree">{degree}</p>
    </div>
  );
};

export default Forcast;
