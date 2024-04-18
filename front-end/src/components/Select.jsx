import React, { useEffect, useRef, useState } from 'react';
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

const Select = ({ options, onSelect }) => {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [isOpen, setIsOpen] = useState(false);

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

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<div ref={dropdownRef} className="relative w-full text-white">
			<div
				className="w-full px-3 text-left rounded-md cursor-pointer focus:outline-none focus:border-blue-500 flex justify-between items-center gap-2"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="max-w-full truncate">
					{selectedOption ? selectedOption.label : options[0]}
				</span>{' '}
				<span>
					{isOpen ? (
						<MdOutlineKeyboardArrowUp />
					) : (
						<MdOutlineKeyboardArrowDown />
					)}
				</span>
			</div>
			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-black  border border-gray-300 rounded-b-md shadow-lg">
					{options.map((option) => (
						<div
							key={option.value}
							className="px-4 py-2 cursor-pointer hover:bg-slate-800"
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
