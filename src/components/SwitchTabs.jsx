import { useState } from "react";

const SwitchTabs = ({ tabs, onSwitch }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const TABS_WIDTH = 80;

  const handleChangeTab = (index) => {
    setTabIndex(index);
    setTimeout(() => {
      onSwitch(tabs[index].toLowerCase());
    }, 100);
  };

  return (
    <div className="relative flex items-center w-fit rounded-full cursor-pointer bg-gray-700/50">
      {tabs.map((tab, i) => {
        return (
          <div
            key={tab}
            onClick={() => handleChangeTab(i)}
            className={"flex justify-center"}
            style={{ width: `${TABS_WIDTH}px` }}
          >
            <span className="p-1 px-3 text-sm rounded-3xl">{tab}</span>
          </div>
        );
      })}
      <div
        className={`absolute -z-10 left-0 top-0 h-full transition duration-300 w-14 bg-gradient-to-tr from-red-500 to-pink-500 rounded-3xl`}
        style={{
          transform: `translateX(${tabIndex * TABS_WIDTH}px`,
          width: `${TABS_WIDTH}px`,
        }}
      ></div>
    </div>
  );
};

export default SwitchTabs;
