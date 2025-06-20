import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io5'
import { RiTwitterXLine } from 'react-icons/ri'

const Topbar = () => {
  return (
    <div className="bg-[#030202f1] text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="hidden md:flex items-center space-x-4 py-2">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>
        <div className='text-sm text-center flex-grow'>
            <span>
                Welcome to our store! Enjoy your shopping experience
            </span>
        </div>
        <div className='text-sm hidden md:block'>
            <a href="tel: +231-43567" className="hover:text-gray-300">
                +231-43567
                </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
