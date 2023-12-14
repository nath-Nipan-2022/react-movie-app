import { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/icons/search.svg";

const SearchBar = ({ onSearch, className }) => {
  const [isOpen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (open && !searchRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [setOpen]);

  return (
    <div
      className={` ${
        isOpen ? "mobile-search-bar-wrapper" : ""
      } sm:bg-transparent sm:border-0 top-0`}
      ref={searchRef}
    >
      <form
        onSubmit={handleSubmit}
        className={`group relative max-w-lg mx-auto rounded-3xl ${
          isOpen ? "h-auto w-full mr-0" : "h-5 w-5 mr-4"
        }`}
      >
        <img
          src={searchIcon}
          alt="search icon"
          width={16}
          className="absolute z-10 -translate-y-1/2 cursor-pointer left-4 top-1/2 group-hover:brightness-125"
          onClick={() => setOpen((prev) => !prev)}
        />
        {isOpen && (
          <input
            type="search"
            value={searchQuery}
            placeholder="Search Movies or TV shows..."
            autoFocus={true}
            name="movie-or-tv-search"
            id="movie-or-tv-search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`search-input py-[0.525rem] ${className || ""}`}
          />
        )}
      </form>
    </div>
  );
};

export default SearchBar;
