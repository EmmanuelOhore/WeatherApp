import React from "react";
const Searchbar = ({ citiesearch, countryName, onsubmit }) => {
  return (
    <form onSubmit={onsubmit} className="input-box">
      <input
        value={countryName}
        onChange={citiesearch}
        type="text"
        placeholder=" Search for cities"
        required={true}
        onSU
        name="searchbar"
      />
      <button className="search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default Searchbar;
