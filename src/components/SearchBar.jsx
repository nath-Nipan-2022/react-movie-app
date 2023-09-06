import { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/icons/search.svg";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, isOpen, setOpen, autoFocus, className }) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchText}`);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!inputRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick, true);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [setOpen]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-md mx-auto relative rounded-3xl ${
        !isOpen ? "hidden" : ""
      }`}
    >
      <img
        src={searchIcon}
        alt="search icon"
        width={16}
        className="absolute left-4 top-3"
      />
      <input
        ref={inputRef}
        value={searchText}
        onChange={handleSearchTextChange}
        type="search"
        autoFocus={autoFocus}
        placeholder="Search movies..."
        name="movie-search"
        id="movie-search"
        className={`search-input py-[0.525rem] ${className || ""}`}
      />
    </form>
  );
};

export default SearchBar;
