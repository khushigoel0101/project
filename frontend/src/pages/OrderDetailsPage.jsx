import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../redux/slices/orderSlice';


export const OrderDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orderDetails, loading, error } = useSelector(state => state.order);

   useEffect(() => {
    dispatch(fetchOrderDetails(id))
   }, [dispatch, id]);
   

   if(loading) return <p>Loading...</p>
   if(error) return <p>Error: {error}</p>

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
             {/* customer, payment, shipping info */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                <div>
                <h4 className='text-lg font-semibold mb-2'>Payment info</h4>
                <p>Payment method: {orderDetails.paymentMethod}</p>
                <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p> 
                </div>
                <div>
                <h4 className='text-lg font-semibold mb-2'>Shipping info</h4>
                <p>Shipping method: {orderDetails.shippingMethod}</p>
                <p>
                    Adress: {" "}
                    {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
                </p> 
                </div>
             </div>
             {/* Product List */}
             <div className='overflow-x-auto'>
                <h4 className='min-w-full text-gray-600 mb-4'>Products</h4>
                <table className='min-w-full text-gray-600 mb-4'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='py-2 px-4'>Name</th>
                            <th className='py-2 px-4'>Unit Price</th>
                            <th className='py-2 px-4'>Quantity</th>
                            <th className='py-2 px-4'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.orderItems.map((item) => (
                                <tr key= {item.product} className='border-b'>
                                    <td className='py-2 px-4 flex items-center'>
                                        <img 
                                        src={item.image}
                                        alt={item.name}
                                        className='w-12 h-12 object-cover rounded mr-4' />
                                        <Link
                                        to={`/product/${item.productId}`}
                                        className='text-blue-600 hover:underline'>
                                            {item.name}
                                        </Link>
                                        </td>
                                    <td className='py-2 px-4'>${item.price}</td>
                                    <td className='py-2 px-4'>{item.quantity}</td>
                                    <td className='py-2 px-4'>${(item.price * item.quantity)}</td>

                                </tr>
                                ))}
                        </tbody>
                </table>
         </div>
             {/* Back to my orders */}
             <Link to="/my-orders" className='text-blue-500 hover:underline'>
                Back to My Orders

             </Link>
         </div>
        )}
    </div>
  )
}
