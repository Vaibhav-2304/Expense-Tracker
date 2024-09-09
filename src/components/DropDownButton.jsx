import { useState } from 'react';
import PropTypes from 'prop-types';

const DropDownButton = ({initialOption, optionList, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(initialOption);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
    onChange(filter); // Execute the passed function when filter changes
  };

  return (
    <div className="flex items-center align-middle justify-center mb-2">
      <span className="mr-2 text-xl text-gray-700 font-semibold">{label}</span>
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {selectedFilter}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {optionList.map((option) => (
                <button
                  key={option}
                  onClick={() => selectOption(option)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DropDownButton.propTypes = {
  initialOption: PropTypes.any.isRequired,
  optionList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default DropDownButton;
