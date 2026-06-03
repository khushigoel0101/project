import { useEffect } from "react";

const Razor = ({ amount, name, email, phone, order, onSuccess, onError }) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => console.log("Razorpay SDK loaded");
    script.onerror = () => alert("Razorpay SDK failed to load");
    document.body.appendChild(script);
  }, []);

  const handleRazorpayPayment = () => {
    const options = {
      key: order?.key || import.meta.env.VITE_RAZORPAY_KEY, 
      amount: order?.amount || amount * 100, 
      currency: order?.currency || "INR",
      order_id: order?.orderId,
      name: "The Xyz Store",
      description: "Test Payment",
      handler: function (response) {
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        name: name || "",
        email: email || "",
        contact: phone || "", // ✅ uses passed value
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      if (onError) onError(response.error);
    });
    rzp.open();
  };

  return (
    <button
      type="button"
      onClick={handleRazorpayPayment}
      disabled={!order?.orderId}
      className="w-full bg-gray-950 text-white py-3 rounded hover:bg-black transition"
    >
      Pay ₹{amount}
    </button>
  );
};


export default Razor;
