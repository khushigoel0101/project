import React, { useState, useRef, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// Import images directly from the assets folder
import overcoatImg from '../../assets/overcoat.jpg'
import basicsImg from '../../assets/essentials.jpg'
import flaredImg from '../../assets/flared.jpg'
import silkImg from '../../assets/silk.jpg'
import styleRedeemImg from '../../assets/style-redeem.jpg'
import skirtsImg from '../../assets/skirts.jpg'
import springImg from '../../assets/late-spring.jpg'
import spotlightImg from '../../assets/spotlight.jpg'

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

  const newArrivals = [
    {
      _id: "1",
      name: "Overcoat",
      price: 3800,
      images: [{ url: overcoatImg, altText: "Overcoat" }]
    },
    {
      _id: "2",
      name: "Essential Basics",
      price: 700,
      images: [{ url: basicsImg, altText: "Essential Basics" }]
    },
    {
      _id: "3",
      name: "Flared fun",
      price: 2500,
      images: [{ url: flaredImg, altText: "Flared fun" }]
    },
    {
      _id: "4",
      name: "Silk fantasy",
      price: 3690,
      images: [{ url: silkImg, altText: "Silk fantasy" }]
    },
    {
      _id: "5",
      name: "Style redeem",
      price: 3690,
      images: [{ url: styleRedeemImg, altText: "Style redeem" }]
    },
    {
      _id: "6",
      name: "From the skirts",
      price: 3690,
      images: [{ url: skirtsImg, altText: "From the skirts" }]
    },
    {
      _id: "7",
      name: "Late Spring",
      price: 3690,
      images: [{ url: springImg, altText: "Late Spring" }]
    },
    {
      _id: "8",
      name: "Spotlight",
      price: 3690,
      images: [{ url: spotlightImg, altText: "Spotlight"

       }
      ]
    }
  ]

 const updateScrollButtons = () => {
    const container = scrollRef.current;
    if(container) {
        const leftScroll = container.scrollLeft;
        const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

        setCanScrollRight(rightScrollable);
        setCanScrollLeft(leftScroll > 0);
    }

    console.log({
        scrollLeft: container.scrollLeft,
        clientWidth: container.clientWidth,
        containerScrollWidth: container.scrollWidth,
    })
 }



  useEffect(()=> {
    const container = scrollRef.current;
    if (container) {
        container.addEventListener("scroll", updateScrollButtons)
        updateScrollButtons()
    }
  },[])

  return (
    <section className="py-10">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button className="p-2 rounded border bg-white text-black shadow">
            <FiChevronLeft className="text-2xl" />
          </button>
          <button className="p-2 rounded border bg-white text-black shadow">
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="container mx-auto overflow-x-auto">
        <div className="flex space-x-6 w-max">
          {newArrivals.map((product) => (
            <div key={product._id} className="min-w-[200px]">
              <div className="w-[200px] h-[250px] overflow-hidden shadow relative">
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className='absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md text-white p-4 '>
                    <Link to={`/products/₹{product._id}`} className="block">
                    <h4 className='font-medium'>{product.name}</h4>
                    <p className='mt-1'>₹{product.price}</p>
                    </Link>
                    </div>
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivals
