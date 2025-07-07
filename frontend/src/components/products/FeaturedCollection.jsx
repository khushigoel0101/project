import React from 'react'
import { Link } from 'react-router-dom';
import featured from "../../assets/featured-collection.jpg"

const FeaturedCollection = () => {
  return <section className='py-16 px-4 lg:px-0'>
    <div className="container mx-auto aspect-[2/1] flex flex-col-reverse lg:flex-row items-center bg-white
     ">
        <div className='lg:w-1/2 p-8 text-center lg:text-left'>
        <h2 className='text-lg font-semibold text-black mb-2'>
            Bold and Beautiful
        </h2>
        <p className='text-lg text-black mb-6'>
            Discover our exclusive collection of clothing and accessories that will make you feel confident and elegant
            evryday, treat yourself to the best in fashion and elevate your wardrobe with our unique pieces.
        </p>
        <Link to ="/collections/all"
        className="bg-gray-700 text-white px-6 py-3 text-lg hover:bg-gray-900">
            Shop Now
        </Link>
        </div>

        {/* Right Content */}
        <div className='lg:w-1/2'>
        <img src={featured} alt="Featured Collection" className="w-full h-full object-cover "/>
        </div>
        </div>
 
  </section>
}

export default FeaturedCollection 