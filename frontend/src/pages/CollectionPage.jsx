import React, { useEffect, useState, useRef } from 'react';
import FilterSidebar from '../components/products/FilterSidebar';
import ProductGrid from '../components/products/ProductGrid';
import SortOptions from '../components/products/SortOptions';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
import { TfiAlignJustify } from "react-icons/tfi";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const filters = { collection: collection || '' };
    dispatch(fetchProductsByFilters(filters));
  }, [collection, searchParams, dispatch]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <FilterSidebar />
      </div>

      {/* Toggle button - hidden when sidebar is open */}
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
        className={`fixed top-29 left-4 z-50 transition-opacity duration-300 
        ${isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <TfiAlignJustify className="text-gray-800 text-3xl" />
      </button>

      {/* Main content */}
      <div className="flex-grow transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl uppercase mb-4">{collection || 'All'} Collection</h2>
          <SortOptions />
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
