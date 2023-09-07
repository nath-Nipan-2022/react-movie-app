import { facebook, instagram, linkedin, twitter } from "../../assets/icons";
const Footer = () => {
  const ICONS_ARRAY = [
    { title: "facebook", src: facebook },
    { title: "instagram", src: instagram },
    { title: "twitter", src: twitter },
    { title: "linkedin", src: linkedin },
  ];

  return (
    <footer className="bg-secondary-color py-12 text-white relative">
      <div className="flex flex-col items-center contentWrapper">
        <ul className="list-none flex items-center justify-center gap-5 mb-5 md:mb-10 opacity-80">
          <li className="transition-all duration-300 cursor-pointer text-sm md:text-base hover:text-primary-color">
            Terms Of Use
          </li>
          <li className="transition-all duration-300 cursor-pointer text-sm md:text-base hover:text-primary-color">
            Privacy-Policy
          </li>
          <li className="transition-all duration-300 cursor-pointer text-sm md:text-base hover:text-primary-color">
            About
          </li>
          <li className="transition-all duration-300 cursor-pointer text-sm md:text-base hover:text-primary-color">
            Blog
          </li>
          <li className="transition-all duration-300 cursor-pointer text-sm md:text-base hover:text-primary-color">
            FAQ
          </li>
        </ul>
        <div className="text-center text-sm opacity-50 max-w-lg mb-5 md:mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="flex items-center justify-center gap-5">
          {ICONS_ARRAY.map((icon) => (
            <span
              key={icon.title}
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-primary-color/30"
            >
              <img
                src={icon.src}
                alt={icon.title}
                title={icon.title}
                width={24}
                height={24}
              />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
