import React from "react";
const DayCast = (props) => {
  const { weatherIcon, weatherType, date } = props;
  return (
    <div className="casts">
      <h3>{date}</h3>
      <div className="casts-condtion">
        <img src={weatherIcon} alt="sun" />
        <h4>{weatherType}</h4>
      </div>
      <p>
        <strong>36</strong>/22
      </p>
    </div>
  );
};

export default DayCast;
