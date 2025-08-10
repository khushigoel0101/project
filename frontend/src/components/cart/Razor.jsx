import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Razor = ({ amount, onSuccess, onError }) => {
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => console.log("Razorpay SDK loaded");
      script.onerror = () => alert("Razorpay SDK failed to load");
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  const handleRazorpayPayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, 
      amount: amount * 100, 
      currency: "INR",
      name: "The Xyz Store",
      description: "Test Payment",
      handler: function (response) {
        console.log("Razorpay Response:", response);
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        name: "Khushi Goel",
        email: "khushi@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      if (onError) onError(response.error);
    });
    rzp.open();
  };

  return (
    <button
      onClick={handleRazorpayPayment}
      className="w-full bg-gray-950 text-white py-3 rounded hover:bg-black transition"
    >
      Pay ₹{amount}
    </button>
  );
};

export default Razor;
