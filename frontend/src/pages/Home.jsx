import React from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionSection from '../components/products/GenderCollectionSection';
import NewArrivals from '../components/products/NewArrivals';
import BestSellers from '../components/products/ProductDetails';
import ProductGrid from '../components/products/ProductGrid';
import mensCol from '../assets/ha-nguy-n-y1LlQ49Thko-unsplash.jpg';
import womenCol from '../assets/alina-bordunova-HgN5CqM6qkQ-unsplash.jpg';
import FeaturedCollection from '../components/products/FeaturedCollection';
import FeaturesSection from '../components/products/FeaturesSection';


 const placeholderProducts = [
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

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      
      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      <BestSellers />

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
