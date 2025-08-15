import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSortChange = (value) => {
    if (value === '') {
      searchParams.delete('sortBy'); // remove sort param
    } else {
      searchParams.set('sortBy', value);
    }
    setSearchParams(searchParams);
    setOpen(false);
  };

  const options = [
    { label: 'Default', value: '' },
    { label: 'Price: Low to High', value: 'priceAsc' },
    { label: 'Price: High to Low', value: 'priceDesc' },
    { label: 'Popularity', value: 'popularity' },
  ];

  const selectedLabel =
    options.find((opt) => opt.value === searchParams.get('sortBy'))?.label ||
    'Default';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mb-6 flex justify-end" ref={dropdownRef}>
      <span
        onClick={() => setOpen(!open)}
        className={`cursor-pointer font-semibold transition flex items-center ${
          searchParams.get('sortBy') && open
            ? 'text-gray-900 border-b-2 border-gray-800'
            : 'text-gray-700'
        }`}
      >
        {selectedLabel}
        <svg
          className={`ml-1 w-4 h-4 transform transition-transform ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </span>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSortChange(opt.value)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortOptions;
