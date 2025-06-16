import React from 'react';
import {RiDeleteBin3Line} from 'react-icons/ri'

const CartComponents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "Phone-Charm",
      size: "M",
      color: "Red",
      price: 80,
      quantity: 1,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "M",
      color: "Gray",
      price: 1200,
      quantity: 1,
      image: "https://picsum.photos/200?random=2",
    },
  ];

  return (
    <div className="p-4">
      {cartProducts.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">-</button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">+</button>
              </div>
            </div>
          </div>
          <div>
            <p> Rs. {product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className = "h-6 w-6 mt-2 text-red-800"/>
            </button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CartComponents;
