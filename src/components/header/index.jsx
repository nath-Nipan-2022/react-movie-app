import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Container from "../Container";
import SearchBar from "../SearchBar";
// icons
import logo from "../../assets/icons/logo.png";
import menu from "../../assets/icons/menu.svg";
import close from "../../assets/icons/close.svg";

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();
  const handleSearch = (value) => {
    navigate(`/search/${value}`);
  };

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

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev);
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
            <li>
              <SearchBar
                onSearch={(value) => handleSearch(value)}
                className={"bg-black"}
              />
            </li>
            <li className="hidden text-sm text-gray-300 hover:text-white md:block">
              <Link to={"/explore/tv"} className="p-1.5 whitespace-nowrap">
                TV Shows
              </Link>
            </li>
            <li className="hidden text-sm text-gray-300 hover:text-white md:block">
              <Link to={"/explore/movie"} className="p-1.5 pr-0">
                Movies
              </Link>
            </li>
            <li className="hidden text-sm text-gray-300 hover:text-white md:block">
              <Link to={"/watchlist"} className="p-1.5 whitespace-nowrap">
                Watchlist
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
            <Link to={"/explore/movie"} className="block p-2">
              Movies
            </Link>
          </li>
          <li className="text-sm text-gray-400 hover:text-white">
            <Link to={"/explore/tv"} className="block p-2">
              TV shows
            </Link>
          </li>
          <li className="text-sm text-gray-400 hover:text-white">
            <Link to={"/watchlist"} className="block p-2">
              Watchlist
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
