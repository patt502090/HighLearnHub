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
          "/courses?populate[bookings][filters][payment_status][$eq]=false&populate=image"
        );
        console.log(response);
        const filterDatas = response.data.data.filter(
          (item) => item.attributes.bookings.data.length !== 0
        );
        setCoursebooked(filterDatas);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();

    const storedPaymentSlip = localStorage.getItem("paymentSlip");
    if (storedPaymentSlip) {
      setPaymentSlip(storedPaymentSlip);
    }
  }, []);

  const calculateDaysAgo = (timestamp) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const paymentDate = new Date(timestamp);
    const diffDays = Math.round(Math.abs((currentDate - paymentDate) / oneDay));
    return diffDays;
  };

  const approvePayment = async (bookingId) => {
    try {
      await ax.put(conf.apiUrlPrefix + `/bookings/${bookingId}`, {
        payment_status: true
      });
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
              {coursebooked.map((course) => (
                <tr key={course.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">John</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {course.attributes.title}
                  </td>
                  <td className="px-6 py-4">{calculateDaysAgo(course.attributes.bookings.data[0].attributes.createdAt)}d ago</td>
                  <td className="px-6 py-4">{course.attributes.price}</td>
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
                    <a className="font-medium text-red-600 dark:text-red-500 hover:underline" >
                      delete
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => approvePayment(course.attributes.bookings.data[0].id)}>
                      Approve
                    </a>
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
