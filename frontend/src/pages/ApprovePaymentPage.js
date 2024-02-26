import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import Navbar from "../components/Navbar";
export default function ApprovePaymentPage() {
  const [coursebooked, setCoursebooked] = useState([]);
  const [paymentSlip, setPaymentSlip] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
          "/users?populate[orders][populate]=confirmation&populate[bookings][populate]=course"
        );
        console.log(response)
        const filterDatas = response.data.filter(
          (item) => item.orders.length !== 0
        );
        setCoursebooked(filterDatas);
        console.log(filterDatas)
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();


  }, []);


  const calculateTotalPrice = (bookings) => {
    let totalPrice = 0;
    bookings.forEach((booking) => {
      totalPrice += booking.course.price;
    });
    return totalPrice.toLocaleString();
  };


  const approvePayment = async (bookingIds) => {
    console.log(bookingIds)
    try {
      for (const id of bookingIds) {
        
        await ax.put(conf.apiUrlPrefix + `/bookings/${id}`, 
        {data:{
          "payment_status": true
        }});
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const DeletePayment = async (ordersId) => {
    try {
      await ax.delete(conf.apiUrlPrefix + `/orders/${ordersId}`
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <>
      <div className="background-image">
        <Navbar />
        <div className="h-screen pt-24 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Slip
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {coursebooked.map((item) => (
                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">{item.first_name}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                    {item.bookings.map((booking) => (
                      <div key={booking.id}>{booking.course.title}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4">{item.orders.map((order) => (
                    <div key={order.id}>
                      {new Date(order.payment_date).toLocaleString('en-US', {
                        timeZone: 'UTC',
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                      })}    </div>
                  ))}</td>
                  <td className="px-6 py-4">{calculateTotalPrice(item.bookings)}</td>
                  <td className="px-6 py-4">
                    {paymentSlip ? (
                      <a href={paymentSlip} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        View Slip
                      </a>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">No Slip Uploaded</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.orders.map((order) => (
                      <div key={order.id}>

                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          onClick={() => DeletePayment(order.id)}
                        >
                          delete

                        </button>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => approvePayment(item.bookings.map(booking => { return booking.id }))}>Approve</button>


                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
