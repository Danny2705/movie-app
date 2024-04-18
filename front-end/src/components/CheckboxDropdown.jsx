import React, { useState, useEffect, useRef } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
const CheckboxDropdown = ({ options, onSelectionChange, title }) => {
  const [selectedOptions, setSelectedOptions] = useState([0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (option) => {
    if (option.value === 0) { // If "All" is selected
      setSelectedOptions([0]); // Select only "All"
    } else if (selectedOptions.includes(0)) { // If "All" was previously selected
      setSelectedOptions([option.value]); // Deselect "All" and select the clicked option
    } else { // Otherwise, toggle the clicked option
      const index = selectedOptions.indexOf(option.value);
      if (index !== -1) {
        setSelectedOptions(selectedOptions.filter((value) => value !== option.value));
      } else {
        setSelectedOptions([...selectedOptions, option.value]);
      }
    }
  };

  useEffect(() => {
    if (selectedOptions.length === options.length - 1) {
      // If all options except "All" are selected, select "All"
      setSelectedOptions([0]);
    }
    onSelectionChange(selectedOptions);
  }, [selectedOptions, options]);

  const getSelectedGenresText = () => {
    if (selectedOptions.length === 0) {
      return 'Select genres';
    } else if (selectedOptions.includes(0)) {
      return 'All';
    } else {
      return selectedOptions.map(option => options.find(item => item.value === option).label).join(', ');
    }
  };
  return (
    <div ref={dropdownRef} className="relative w-full ">
      <div
        className="w-full px-3 text-left rounded-md cursor-pointer focus:outline-none focus:border-blue-500 flex justify-between items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='max-w-full truncate'>{getSelectedGenresText()}</span> <span>{isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-black border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <div key={option.value} className={`flex items-center px-4 py-2 hover:bg-slate-800 ${selectedOptions.includes(option.value) && 'bg-slate-800'}`} onClick={() => toggleOption(option)}>
              <div className="mr-2 cursor-pointer">
                {selectedOptions.includes(option.value) && <FaCheck />}
              </div>
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
