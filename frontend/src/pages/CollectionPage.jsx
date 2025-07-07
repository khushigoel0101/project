import React, { use } from 'react'
import mensCol from '../assets/ha-nguy-n-y1LlQ49Thko-unsplash.jpg';
import womenCol from '../assets/alina-bordunova-HgN5CqM6qkQ-unsplash.jpg';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/products/FilterSidebar';
import { useRef } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import SortOptions from '../components/products/SortOptions';


const CollectionPage = () => {
    const [products, setProducts] = React.useState([]);
    const sidebarRef = useRef(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleClickOutside = (e) => {
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        document.removeEventListener('mousedown', handleClickOutside)
    })

    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
               {
                      _id : 1,
                      name: "Product 1",
                      price: 100,
                      images: [{
                          url: mensCol,
                      }],
                  },
                  {
                      _id : 2,
                      name: "Product 2",
                      price: 150,
                      images: [{
                          url: womenCol,
                      }],
                  },
                  {
                      _id : 3,
                      name: "Product 3",
                      price: 150,
                      images: [{
                          url: mensCol,
                      }],
                  },
                  {
                      _id : 4,
                      name: "Product 4",
                      price: 150,
                      images: [{
                          url: womenCol,
                      }],
                  },
                   {
                          _id : 5,
                          name: "Product 5",
                          price: 100,
                          images: [{
                              url: mensCol,
                          }],
                      },
                      {
                          _id : 6,
                          name: "Product 6",
                          price: 150,
                          images: [{
                              url: womenCol,
                          }],
                      },
                      {
                          _id : 7,
                          name: "Product 7",
                          price: 150,
                          images: [{
                              url: mensCol,
                          }],
                      },
                      {
                          _id : 8,
                          name: "Product 8",
                          price: 150,
                          images: [{
                              url: womenCol,
                          }],
                      },
             ]
             setProducts(fetchedProducts);
        }, 1000);
    },[])
  return (
    <div className='flex flex-col lg:flex-row'>
        {/*Mobile Filter Button*/}
        <button 
        onClick={toggleSidebar}
        className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className='mr-2' />
        </button>

        {/*Filter Section*/}
        <div ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50
        left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:translate-x-0 lg:static `}>
            <FilterSidebar />
        </div>
        <div className='flex-grow p-4'>
            <h2 className='text-2xl uppercase mb-4'>All Collection</h2>

            <SortOptions />

            <ProductGrid products = {products} />
        </div>
    </div>
  )
}

export default CollectionPage