import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import Navbar from "../components/Navbar";
import { Modal, ModalBody } from "flowbite-react";

export default function ApprovePaymentPage() {
  const [coursebooked, setCoursebooked] = useState([]);
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [showmodal,setShowmodal]=useState(false);
  const [confirmationUrl,setConfirmationUrl] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
          "/orders?populate[confirmation][populate]=*&populate[bookings][filters][payment_status][$eq]=false&populate[bookings][populate][course][populate]=image&populate=user"
        );
        console.log(response)

        setCoursebooked(response.data.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();


  }, []);

  console.log(coursebooked)
  const calculateTotalPrice = (price) => {
    console.log(price)
    let totalPrice = 0;

    price.data.forEach((pricebooking) => {
      totalPrice += pricebooking.attributes.course.data.attributes.price
    });

    return totalPrice.toLocaleString();
  };


  const approvePayment = async (bookingIds, orderIds) => {
    console.log(bookingIds)
    try {
        for (const booking of bookingIds.data) {
            await ax.put(conf.apiUrlPrefix + `/bookings/${booking.id}`, {
                data: {
                    "payment_status": true,
                    "status": "success"
                }
            });
        }
        await DeletePayment(orderIds)
    } catch (error) {
        console.error("Error updating payment status:", error);
    }
};


  const DeletePayment = async (ordersId,bookingIds) => {
    try {
      await ax.delete(conf.apiUrlPrefix + `/orders/${ordersId}`
      
      );
      for (const booking of bookingIds.data) {
        await ax.put(conf.apiUrlPrefix + `/bookings/${booking.id}`, {
            data: {
                "status": "cart"
            }
        });
    }
      
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
              {coursebooked?.map((item) => (
                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">{item.attributes.user.data.attributes.username}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.attributes.bookings?.data.map((booking) => (
                      <div key={booking?.id}>{booking?.attributes.course?.data?.attributes?.title}</div>
                    ))}

                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.attributes.payment_date).toLocaleString('en-US', {
                      timeZone: 'UTC',
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false
                    })}
                  </td>
                  
                    <td className="px-6 py-4">{calculateTotalPrice(item.attributes.bookings)}</td>
                  
                  <td className="px-6 py-4">
                     
                      <button  className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                      onClick={()=>[setShowmodal(true),setConfirmationUrl(item.attributes.confirmation.data.attributes.url)]}> 
                        View Slip
                      </button>
                  </td>
                  <td className="px-6 py-4">


                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => DeletePayment(item.id,item.attributes.bookings,item.id)}
                    >
                      delete

                    </button>


                  </td>
                  <td className="px-6 py-4">

                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => approvePayment(item.attributes.bookings,item.id)}>Approve</button>


                  </td>
                </tr>
                
            ))}
            </tbody>
          </table>
          {console.log(coursebooked)}
          {coursebooked.map(item =>(
          <Modal show={showmodal} onClose={() => setShowmodal(false)}>
        <Modal.Header>Confirmation</Modal.Header>
        <ModalBody><div>
        <img
                          className=" w-full  "
                          src={"http://localhost:1337"+confirmationUrl}
                          alt=""
                          />
        </div></ModalBody>
        </Modal>))}
        </div>
        
      </div>
    </>
  );
}
