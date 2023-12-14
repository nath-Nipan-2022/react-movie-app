import { useEffect, useRef, useState } from "react";
import { chevron } from "../assets/icons";
import close from "../assets/icons/close.svg";

const Select = ({
  data,
  onChange,
  title,
  isMultiSelect,
  renderValue,
  renderOption,
}) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const selectRef = useRef();

  // close select / dropdown
  useEffect(() => {
    const handler = (e) => {
      if (openSelect && !selectRef.current.contains(e.target)) {
        setOpenSelect(false);
      }
    };
    document.body.addEventListener("click", handler, true);

    return () => {
      document.body.removeEventListener("click", handler, true);
    };
  }, [openSelect]);

  const selectItem = (item) => {
    setSelectedItems([item]);
    onChange(item);
  };

  const removeItem = (item) => {
    let filterItems = selectedItems.filter(
      (s) => renderValue(s) !== renderValue(item)
    );
    setSelectedItems(filterItems);
    onChange(filterItems);
  };

  const handleSelectItem = (newItem) => {
    if (selectedItems.includes(newItem)) {
      removeItem(newItem);
      return;
    }
    setSelectedItems([...selectedItems, newItem]);
    onChange([...selectedItems, newItem]);
  };

  const handleRemoveItem = (item) => {
    removeItem(item);
    setOpenSelect(false);
  };

  const renderSelectedItems = selectedItems.map((item) => (
    <span
      key={renderValue(item)}
      className="flex items-center h-5 pl-2.5 pr-1 text-[11px] leading-none text-gray-300 bg-dark-color rounded-xl"
    >
      {renderOption(item)}
      <img
        src={close}
        onClick={() => handleRemoveItem(item)}
        alt="close icon"
        width={14}
        height={14}
        className="ml-[2px] transition hover:scale-125"
      />
    </span>
  ));

  return (
    <div
      className={`text-sm min-w-[200px] text-white relative ${
        openSelect ? "overflow-visible" : "overflow-hidden"
      }`}
      ref={selectRef}
    >
      <div
        onClick={() => setOpenSelect((prev) => !prev)}
        className="flex justify-between gap-2 px-3 py-2 transition bg-pink-800 border border-pink-700 outline-none cursor-pointer rounded-3xl hover:border-pink-500"
      >
        {selectedItems.length > 0 && isMultiSelect ? (
          <div className="flex flex-wrap gap-1">{renderSelectedItems}</div>
        ) : (
          renderOption(selectedItems[0])
        )}

        {!selectedItems.length && <span className="pl-2">{title}</span>}

        {/* chevron */}
        <div className="grid w-5 h-5 border-l border-gray-400 place-items-center">
          <img
            src={chevron}
            alt="chevron"
            width={10}
            height={10}
            className={`transition duration-300 ${
              openSelect ? "-rotate-180" : "rotate"
            }`}
          />
        </div>
      </div>

      <div
        className={`py-1 mt-1 absolute top-full left-0 z-[5] w-full overflow-hidden text-gray-800 bg-white rounded-lg ${
          openSelect ? "visible" : "invisible"
        }`}
      >
        {data?.map((item) => {
          if (!isMultiSelect) {
            return (
              <div
                key={renderValue(item)}
                onClick={() => selectItem(item)}
                className="p-[5px] px-3 border-b border-[#f1e7e7] last:border-0 hover:bg-black/10 flex gap-4 justify-between items-center cursor-pointer"
              >
                {renderOption(item)}
              </div>
            );
          }
          return (
            <label
              className="p-[5px] px-3 border-b border-[#f1e7e7] last:border-0 hover:bg-black/10 flex gap-4 justify-between items-center cursor-pointer"
              key={renderValue(item)}
              htmlFor={renderValue(item)}
            >
              {renderOption(item)}
              <input
                type="checkbox"
                name="check"
                id={renderValue(item)}
                checked={selectedItems.some(
                  (s) => renderValue(s) === renderValue(item)
                )}
                onChange={() => handleSelectItem(item)}
                className={`w-3 h-3 accent-slate-700`}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};
export default Select;
