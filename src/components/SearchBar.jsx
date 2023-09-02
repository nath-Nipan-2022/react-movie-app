import React, { useState } from "react";
import searchIcon from "../assets/icons/search.svg";

const SearchBar = ({ handleSearch }) => {
  // const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // handleSearch(e.target.elements);
  };

  const handleSearchChange = (e) => {
    // debounce
    let timer;
    clearTimeout(timer);

    timer = setTimeout(() => {
      // setTerm(e.target.value);
      handleSearch(e.target.value);
    }, 500);
  };

  return (
    <article className="search-bar-width mx-auto">
      <form
        onSubmit={handleSubmit}
        className="relative rounded-3xl w-full max-w-sm mx-auto"
      >
        <img
          src={searchIcon}
          alt="search icon"
          width={16}
          className="absolute z-10 left-4 top-3"
        />

        <input
          onChange={handleSearchChange}
          type="search"
          // value={term}
          placeholder="Search movies..."
          name="movie-search"
          id="movie-search"
          className="search-input py-[0.525rem] pl-10 pr-4 bg-gray-900 border border-gray-700 text-white rounded-full"
        />
      </form>
    </article>
  );
};

export default SearchBar;
