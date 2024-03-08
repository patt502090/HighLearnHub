import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import Navbar from "../components/Navbar";
import { Modal, ModalBody } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { ContextProvider } from "../context/Auth.context";
import { CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";

export default function ApprovePaymentPage() {
  const [coursebooked, setCoursebooked] = useState([]);
  const [showmodal, setShowmodal] = useState(false);
  const [confirmationUrl, setConfirmationUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ax.get(
        conf.apiUrlPrefix +
        "/orders?populate[confirmation][populate]=*&populate[bookings][filters][payment_status][$eq]=false&populate[bookings][populate][course][populate]=image&populate=user"
      );
      setCoursebooked(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const calculateTotalPrice = (price) => {
    let totalPrice = 0;
    price.data.forEach((pricebooking) => {
      const pricecourse = pricebooking.attributes.course.data.attributes.price
      const discountcourse = pricebooking.attributes.course.data.attributes.discount
      if (pricebooking.attributes.course.data.attributes.discount === 1){
        totalPrice += pricecourse
      }
      else{
        totalPrice += Math.round(pricecourse*((100-discountcourse)/100))
      }
    });
    return totalPrice.toLocaleString();
  };

  const updateAmount = async (courseData) => {
    const courseIds = courseData?.data.map(item => ({
      id: item.attributes.course.data?.id
    }))
    
    try {
      for (const chooseId of courseIds) {
        await ax.put(conf.apiUrlPrefix + `/amount/${chooseId.id}`);
        // console.log(chooseId.id)
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  }

  const approvePayment = async (bookingIds, orderIds) => {
    try {
      for (const booking of bookingIds.data) {
        await ax.put(conf.apiUrlPrefix + `/bookings/${booking.id}`, {
          data: {
            "payment_status": true,
            "status": "success"
          }
        });
      } 
      
      updateAmount(bookingIds)
      console.log(bookingIds)
      await DeletePayment(bookingIds,orderIds)
      toast.success("ยืนยันการชำระเงินสำเร็จ!");
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const DeletePayment = async (bookingIds,orderIds) => {
    try {
      setLoading(true);
      await ax.delete(conf.apiUrlPrefix + `/orders/${orderIds}`);
      for (const booking of bookingIds.data) {
        await ax.put(conf.apiUrlPrefix + `/bookings/${booking.id}`, {
          data: {
            "status": "cart"
          }
        });
  
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    } finally {
      fetchData();
    }
  };

  const handleDeleteClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDeleteModal(true);
  };

  const handleApproveClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowApproveModal(true);
  };

  const handleDelete = async (orderId) => {
    try {
      await DeletePayment(orderId);
      setShowDeleteModal(false);
      toast.success("ลบรายการสำเร็จ!");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleApprove = async (orderId) => {
    try {
      await approvePayment(orderId.attributes.bookings, orderId.id);
      setShowApproveModal(false);
    } catch (error) {
      console.error("Error approving payment:", error);
    }
  };

  return (
    <>
      <ContextProvider>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>ยืนยันการชำระเงิน</title>
        </Helmet>
        {loading ?
          <div className="background-image">
            <div className="h-screen flex justify-center items-center">
              <CircularProgress />
            </div>
          </div>
          :
          <div className="background-image">
            <Navbar />
            <div className="h-screen pt-24 relative overflow-x-auto shadow-md sm:rounded-lg px-6">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ชื่อผู้ใช้
                      </th>
                      <th scope="col" className="px-6 py-3">
                        คอร์ส
                      </th>
                      <th scope="col" className="px-6 py-3">
                        วันและเวลาที่ซื้อ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ราคา
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ใบเสร็จชำระเงิน
                      </th>
                      <th scope="col" className="px-6 py-3">
                        การลบ
                      </th>
                      <th scope="col" className="px-6 py-3">
                        การยอมรับ
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
                          <button className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                            onClick={() => [setShowmodal(true), setConfirmationUrl(item.attributes.confirmation.data.attributes.url)]}>
                            ดูใบเสร็จชำระเงิน
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            ลบ
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => handleApproveClick(item)}
                          >
                            ยอมรับ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {coursebooked.map(item => (
                  <Modal key={item.id} show={showmodal} onClose={() => setShowmodal(false)}>
                    <Modal.Header>Confirmation</Modal.Header>
                    <ModalBody>
                      <div className="flex justify-center">
                        <img src={conf.urlPrefix + confirmationUrl} className="w-full max-h-96 object-contain" alt="Payment Confirmation" />
                      </div>
                    </ModalBody>
                  </Modal>
                ))}
                {showDeleteModal && (
                  <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                    <Modal.Header className="bg-red-500 text-white">
                      ยืนยันการลบ
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-gray-700">คุณต้องการลบรายการนี้ใช่หรือไม่?</p>
                      <div className="flex justify-end mt-4">
                        <button onClick={() => handleDelete(selectedOrderId)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">ลบ</button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">ยกเลิก</button>
                      </div>
                    </Modal.Body>
                  </Modal>
                )}
                {showApproveModal && (
                  <Modal show={showApproveModal} onClose={() => setShowApproveModal(false)}>
                    <Modal.Header className="bg-blue-500 text-white">
                      ยืนยันการชำระเงิน
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-gray-700">คุณต้องการยืนยันการชำระเงินสำหรับรายการนี้ใช่หรือไม่?</p>
                      <div className="flex justify-end mt-4">
                        <button onClick={() => handleApprove(selectedOrderId)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">ยืนยัน</button>
                        <button onClick={() => setShowApproveModal(false)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">ยกเลิก</button>
                      </div>
                    </Modal.Body>
                  </Modal>
                )}
              </div>
            </div>
          </div>}
      </ContextProvider>
    </>
  );
}
