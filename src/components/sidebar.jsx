import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/wind-logo.png";

const SideBar = () => {
  return (
    <div className="weather-sidebar">
      <div className="weather-logo">
        <img src={logo} alt="logo" />
      </div>
      <nav className="side-bar-content">
        <ul>
          <li>
            <i class="fa-solid fa-cloud-sun"></i> <Link to="/">Weather</Link>
          </li>
          <li>
            <i class="fa-solid fa-list"></i>
            <Link to="/cities"> Cities</Link>
          </li>
          <li>
            {" "}
            <i class="fa-solid fa-map"></i> <Link to="/map">Map</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
