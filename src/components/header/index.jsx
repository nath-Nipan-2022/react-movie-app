import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDebounce } from "../../hook/useDebounce";
import Container from "../Container";
import SearchBar from "../SearchBar";
// icons
import logo from "../../assets/icons/logo.png";
import searchIcon from "../../assets/icons/search.svg";
import menu from "../../assets/icons/menu.svg";
import close from "../../assets/icons/close.svg";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const debouncedValue = useDebounce(searchQuery, 500);
  console.log("debouncedValue: ", debouncedValue, "searchQuery: ", searchQuery);

  useEffect(() => {
    const handleScroll = () => {
      //  hide condition
      if (window.scrollY > 200 && window.scrollY > lastScrollY && !showMenu) {
        setShowHeader(false);
      } else if (lastScrollY - window.scrollY > 5) {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, showMenu]);

  const handleSearchIconClick = () => {
    setShowSearchBar(true);
    setShowMenu(false);
  };

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev);
    setShowSearchBar(false);
  };

  return (
    <header
      className={`sticky top-0 z-10 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${lastScrollY > 100 ? "backdrop-blur bg-dark-color/30" : ""}`}
    >
      <Container className="relative z-20 flex items-center justify-between py-0 h-14 md:h-16">
        <Link to={"/"} className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="logo" width={30} height={30} title="logo" />
          <span className="text-2xl font-bold text-gradient">MovieLand</span>
        </Link>

        <nav>
          <ul className="flex items-center gap-4">
            <li
              className={`${
                showSearchBar
                  ? "mobile-search-bar-wrapper sm:bg-transparent sm:border-0"
                  : "opacity-0 sm:opacity-100"
              }`}
            >
              <SearchBar
                onSearch={setSearchQuery}
                isOpen={showSearchBar}
                setOpen={setShowSearchBar}
                autoFocus={showSearchBar}
                className={"bg-black"}
              />
            </li>
            <li
              onClick={handleSearchIconClick} // open search bar
              className={`group sm:pr-1 relative ${
                showSearchBar ? "hidden" : ""
              }`}
            >
              <img
                src={searchIcon}
                alt="search icon"
                width={15}
                title="search icon"
                className="cursor-pointer group-hover:brightness-125"
              />
            </li>
            <li className="hidden text-sm text-gray-300 hover:text-white md:block">
              <Link to={"/explore/tv"} className="p-1.5 whitespace-nowrap">
                TV Shows
              </Link>
            </li>
            <li className="hidden text-sm text-gray-300 hover:text-white md:block">
              <Link to={"/explore/movies"} className="p-1.5 pr-0">
                Movies
              </Link>
            </li>
            <li
              className="group md:hidden"
              onClick={handleMenuClick} // open mobile menu
            >
              <img
                src={showMenu ? close : menu}
                alt="hamburger"
                width={20}
                title="hamburger icon"
                className="cursor-pointer group-hover:brightness-125"
              />
            </li>
          </ul>
        </nav>
      </Container>
      {/* Mobile menu */}
      <nav
        className={`md:hidden absolute w-full left-0 top-full transition duration-300 ${
          showMenu
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-20 opacity-0 invisible"
        }`}
      >
        <ul className="p-4 border-gray-800 border-y bg-dark-color">
          <li className="text-sm text-gray-400 hover:text-white">
            <Link to={"/"} className="block p-2">
              Movies
            </Link>
          </li>
          <li className="text-sm text-gray-400 hover:text-white">
            <Link to={"/"} className="block p-2">
              TV shows
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
