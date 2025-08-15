import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const categories = ['TopWear', 'BottomWear'];
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Orange', 'Gray'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const materials = ['Cotton', 'Polyester', 'Wool', 'Silk', 'Denim', 'Leather', 'Linen', 'Rayon', 'Acrylic', 'Nylon'];
  const brands = [
    'Maison Auréle',
    'Velour Élan',
    'Sable Noir',
    'Lunaria Couture',
    'Château Blanc',
    'Noir de Luxe',
    'Ardent Atelier',
    'Éclat Verité',
    'Valente Vogue',
    'Beaumont & Cie',
  ];
  const genders = ['Men', 'Women'];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      size: params.size ? params.size.split(',') : [],
      material: params.material ? params.material.split(',') : [],
      brand: params.brand ? params.brand.split(',') : [],
      minPrice: params.minPrice ? Number(params.minPrice) : 0,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 10000,
    });
    setPriceRange([0, params.maxPrice ? Number(params.maxPrice) : 10000]);
  }, [searchParams]);

  const handleFilterClick = (name, value) => {
    const newFilters = { ...filters };
    if (Array.isArray(newFilters[name])) {
      if (newFilters[name].includes(value)) {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      } else {
        newFilters[name] = [...newFilters[name], value];
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(','));
      } else if (newFilters[key] !== '' && newFilters[key] !== null && newFilters[key] !== undefined) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

 const renderOptions = (name, options) => (
  <div className="mt-2 pl-2 flex flex-wrap gap-2">
    {options.map((option) => (
      <span
        key={option}
        onClick={() => handleFilterClick(name, option)}
        className={`cursor-pointer transition hover:text-gray-900 ${
          filters[name] === option || (Array.isArray(filters[name]) && filters[name].includes(option))
            ? 'text-gray-950 font-semibold'
            : 'text-gray-700'
        }`}
      >
        {option}
      </span>
    ))}
  </div>
);


  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      <details className="mb-4">
        <summary className="cursor-pointer text-gray-800 font-medium text-lg list-none outline-none">Category</summary>
        {renderOptions('category', categories)}
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer text-gray-800 font-medium text-lg list-none outline-none">Gender</summary>
        {renderOptions('gender', genders)}
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer text-gray-800 font-medium text-lg list-none outline-none">Color</summary>
        <div className="mt-2 pl-2 flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={() => handleFilterClick('color', color)}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? 'ring-2 ring-black' : ''
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer text-gray-800 font-medium text-lg list-none outline-none">Size</summary>
        {renderOptions('size', sizes)}
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer text-gray-800 font-medium text-lg list-none outline-none">Material</summary>
        {renderOptions('material', materials)}
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer text-gray-800 font-medium text-lg list-none outline-none">Brand</summary>
        {renderOptions('brand', brands)}
      </details>

      <details className="mb-4">
        <summary className="cursor-pointer text-gray-800 font-medium text-lg list-none outline-none">Price</summary>
        <div className="mt-2 pl-2">
          <input
            type="range"
            name="priceRange"
            min={0}
            max={10000}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-gray-600 mt-2">
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </details>
    </div>
  );
};

export default FilterSidebar;
