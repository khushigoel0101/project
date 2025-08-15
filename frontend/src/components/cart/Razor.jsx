import React, { useEffect, useState } from 'react';

const Razor = ({ amount, onSuccess, onError }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => alert("Razorpay SDK failed to load");
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  const handleRazorpayPayment = () => {
    if (!scriptLoaded) {
      alert("Please wait, payment gateway is still loading...");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Invalid payment amount");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "The Xyz Store",
      description: "Order Payment",
      handler: function (response) {
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
    rzp.on("payment.failed", function (response) {
      if (onError) onError(response.error);
    });
    rzp.open();
  };

  return (
    <button
      onClick={handleRazorpayPayment}
      disabled={!scriptLoaded}
      className={`w-full py-3 rounded transition ${
        scriptLoaded ? "bg-gray-950 text-white hover:bg-black" : "bg-gray-400 text-gray-200 cursor-not-allowed"
      }`}
    >
      {scriptLoaded ? `Pay ₹${amount}` : "Loading Payment Gateway..."}
    </button>
  );
};

export default Razor;
