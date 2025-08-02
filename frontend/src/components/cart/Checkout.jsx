import React from 'react';
import { useNavigate } from 'react-router-dom';
import Razor from './Razor';

const cart = {
  products: [
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
  ],
  totalPrice: 1280,
};

const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = React.useState(null);
  const [shippingAddress, setShippingAddress] = React.useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    // Dummy logic to simulate generating a checkout ID
    setCheckoutId('checkout_' + Date.now());
    // You can also send shippingAddress to backend here
  };

  const handlePaymentSuccess = (details) => {
    console.log(details);
    navigate("/order-confirmation")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section - Checkout Form */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout} className="space-y-6">
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded bg-gray-100"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, address: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, city: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.zipCode}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, phone: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, country: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Razorpay</h3>
                <Razor amount={100} onSuccess={handlePaymentSuccess}
                onError={(err) => alert("Payment failed.Try again")}/>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section - Cart Summary */}
      <div className="bg-white rounded-lg p-6 shadow h-fit">
        <h3 className="text-xl mb-4 font-semibold">Order Summary</h3>
        <ul className="divide-y">
          {cart.products.map((product) => (
            <li key={product.productId} className="flex gap-4 py-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">Size: {product.size}, Color: {product.color}</p>
                <p className="text-sm text-gray-700">₹{product.price} x {product.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between font-semibold">
          <span>Total:</span>
          <span>₹{cart.totalPrice?.toLocaleString()}</span>
        </div>
        <div className='flex justify-between font-semibold items-center text-lg '>
          <p>Shipping:</p>
          <p>Free</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
