import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";

const Select = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={dropdownRef}
      className={`${
        darkMode ? "bg-black" : "bg-white"
      } relative w-full text-white`}
    >
      <div
        className='w-full px-3 text-left rounded-md cursor-pointer focus:outline-none focus:border-blue-500 flex justify-between items-center gap-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`max-w-full truncate ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {selectedOption ? selectedOption.label : options[0]}
        </span>{" "}
        <span>
          {isOpen ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </span>
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 w-full mt-1 ${
            darkMode ? "bg-black" : "bg-white"
          } ${
            darkMode ? "text-white" : "text-black"
          } border border-gray-300 rounded-b-md shadow-lg`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer ${
                darkMode ? "hover:bg-slate-800" : "hover:bg-slate-500"
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
