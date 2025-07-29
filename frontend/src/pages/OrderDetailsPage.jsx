import React from 'react'
import { useParams } from 'react-router-dom';


export const OrderDetailsPage = () => {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = React.useState(null);

    React.useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelivered: false,
            paymentMethod: "Razorpay",
            shippingMethod: "Standard Shipping",
            shippingAddress: {
                city: "New York",
                country: "USA",
        },
        orderItems: [
                  {
                    productId: "1",
                    name: "Jacket",
                    price: 120,
                    quantity: 1,
                    image: "https://picsum.photos/200?random=1",
                  },
                  {
                    productId: "2",
                    name: "Shirt",
                    price: 80,
                    quantity: 2,
                    image: "https://picsum.photos/200?random=2",
                  }
        ]
    }
    setOrderDetails(mockOrderDetails);
},[id]);

   

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
        {!orderDetails ? (<p>No order details found</p> ): (
            <div className='p-4 sm:p-6 rounded-lg border'>
             <div className='flex flex-col sm:flex-row justify-between mb-8'>
                <div>
                    <h3 className='text-lg md:text-xl font-semibold'>
                        Order ID: #{orderDetails._id}
                    </h3>
                    <p className='text-gray-600'>
                        {new Date(orderDetails.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                    <span 
                    className={`${
                        orderDetails.isPaid ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'}px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                            {orderDetails.isPaid ? 'Approved' : 'Pending'}
                        </span>
                    </div>
             </div>
             </div>
        )}
    </div>
  )
}
