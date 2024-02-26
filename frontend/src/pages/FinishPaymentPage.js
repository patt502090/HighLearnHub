import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Progessbar from "../components/Progessbar";
import { Helmet } from "react-helmet";

function FinishPaymentPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfirmation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className="background-image">
      <Navbar />
      <Progessbar></Progessbar>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ชำระเงินเสร็จสิ้น</title>
        </Helmet>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 lg:w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="flex items-center justify-center rounded-t-3xl p-3 w-full text-lg font-bold">
            {showConfirmation ? "รอการตรวจสอบ" : "ชำระเงินเสร็จสิ้น"}
          </div>
          {showConfirmation ? (
            <div className="text-center p-3">
              <div className="flex items-center justify-center mb-3">
                <img
                  src="https://media.istockphoto.com/id/944011350/vector/hourglass-with-transparent-glass.jpg?s=612x612&w=0&k=20&c=Y1K39qKz-od-EFf6AF-vOVawB2ncXIX7baW0Zyetp_8="
                  alt="รอการตรวจสอบ"
                  style={{ maxWidth: "350px" }}
                />
              </div>
              <ul style={{ listStyleType: "circle", textAlign: "left" }}>
                <li>กรุณารอผลการตรวจสอบการชำระเงินภายใน 1 - 2 ชั่วโมง</li>
                <li>โดยสินค้าจะเข้าสู่บัญชีของท่านภายหลังจากการตรวจสอบความถูกต้องเสร็จสิ้น</li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <img
                className="h-auto max-w-full rounded-xl"
                src="https://i.pinimg.com/736x/5d/b3/60/5db360def4d6a542f802d74cc94fe549.jpg"
                alt=""
                style={{ marginBottom: "20px" }} 
              />
            </div>
          )}
          {showConfirmation && (
            <div className="flex items-center justify-center rounded-t-3xl p-3 w-full text-lg font-bold">
              ขอบคุณที่ใช้บริการ
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-0">
        <Link to="/mycourse">
          <button className="py-5 px-11 mb-10 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600" >
            คอร์สของฉัน
          </button>
        </Link>
      </div>
      </div>
    </>
  );
}

export default FinishPaymentPage;
