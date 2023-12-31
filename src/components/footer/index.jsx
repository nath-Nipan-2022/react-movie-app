import { facebook, instagram, linkedin, twitter } from "../../assets/icons";
const Footer = () => {
  const ICONS_ARRAY = [
    { title: "facebook", src: facebook },
    { title: "instagram", src: instagram },
    { title: "twitter", src: twitter },
    { title: "linkedin", src: linkedin },
  ];

  return (
    <footer className="relative pt-16 pb-12 mt-12 text-white bg-secondary-color">
      <div className="flex flex-col items-center">
        <ul className="flex items-center justify-center gap-5 mb-8 text-sm list-none md:mb-10 opacity-80">
          <li className="transition-all duration-300 cursor-pointer md:text-base hover:text-primary-color">
            Terms of Use
          </li>
          <li className="transition-all duration-300 cursor-pointer md:text-base hover:text-primary-color">
            Privacy policy
          </li>
          <li className="transition-all duration-300 cursor-pointer md:text-base hover:text-primary-color">
            About
          </li>
          <li className="transition-all duration-300 cursor-pointer md:text-base hover:text-primary-color">
            Blog
          </li>
          <li className="transition-all duration-300 cursor-pointer md:text-base hover:text-primary-color">
            Faq
          </li>
        </ul>
        <div className="max-w-xl px-8 mb-5 text-xs leading-normal text-center opacity-50 md:mb-10">
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
              className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-black rounded-full opacity-50 cursor-pointer hover:opacity-80 hover:bg-primary-color/30"
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
