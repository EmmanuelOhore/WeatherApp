import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Searchbar from "./smallerComponents/sreachbar";
import "../styles/map.css";
const Map = ({
  onsubmit,
  countryName,
  citiesearch,
  handleMapClick,
  longitude,
  latitude,
}) => {
  return (
    <>
      <div className="city-search">
        <Searchbar
          onsubmit={onsubmit}
          citiesearch={citiesearch}
          countryName={countryName}
        />
      </div>
      <div className="maps">
        <LoadScript googleMapsApiKey="AIzaSyAfHP2R6EdL7sboSuPxMYSQ9jQc5f4BdwU">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "1.5rem",
            }}
            center={{ lat: latitude, lng: longitude }}
            zoom={5}
            onClick={handleMapClick}
          ></GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default Map;
