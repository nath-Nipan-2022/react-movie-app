import { useState } from "react";

const SwitchTabs = ({ tabs, onSwitch }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const TABS_WIDTH = 90;

  const handleChangeTab = (index) => {
    setTabIndex(index);
    setTimeout(() => {
      onSwitch(tabs[index].toLowerCase());
    }, 100);
  };

  return (
    <div className="relative -z-0 flex items-center w-fit rounded-full cursor-pointer bg-gray-700">
      {tabs.map((tab, i) => {
        return (
          <div
            key={tab}
            onClick={() => handleChangeTab(i)}
            className={
              "flex justify-center transition-colors hover:text-gray-300 z-0"
            }
            style={{ width: `${TABS_WIDTH}px` }}
          >
            <span className="p-1 px-3 text-sm rounded-3xl">{tab}</span>
          </div>
        );
      })}
      <div
        className={`absolute -z-10 left-0 top-0 h-full transition duration-300 w-14 bg-gradient-to-br from-fuchsia-300 to-orange-300 rounded-3xl opacity-60`}
        style={{
          transform: `translateX(${tabIndex * TABS_WIDTH}px`,
          width: `${TABS_WIDTH}px`,
        }}
      ></div>
    </div>
  );
};

export default SwitchTabs;
