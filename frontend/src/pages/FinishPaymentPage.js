import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


function FinishPaymentPage() {
  return (
    <>
      <Navbar />
      <body>
        <div class="flex flex-col justify-center items-center h-[100vh] pt-4">
          <div class="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div class="flex items-center justify-center rounded-t-3xl p-3 w-full text-lg font-bold">
              ชำระเงินเสร็จสิ้น
            </div>
            <img
              class="h-auto max-w-full rounded-xl"
              src="https://i.pinimg.com/736x/5d/b3/60/5db360def4d6a542f802d74cc94fe549.jpg"
              alt=""
            />
            <div class="flex items-center justify-center rounded-t-3xl p-3 w-full text-lg font-bold">
              ขอบคุณที่ใช้บริการ
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-10 mb-10">
          <Link to="/mycourse">
            <button className="py-5 px-11 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600">
              คอร์สของฉัน
            </button>
          </Link>
        </div>
      </body>
    </>
  );
}

export default FinishPaymentPage;
