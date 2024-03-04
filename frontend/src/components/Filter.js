import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 focus:outline-none"
        style={{ marginLeft: "4px" }}
      >
        {/* <svg
          className={`w-2.5 h-2.5 transition-transform duration-300 ${
            isOpen ? "transform rotate-200  " : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg> */}
        <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "transform rotate-200  " : ""
          }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
        </svg>

      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full md:w-96 flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-lg dark:border-gray-700 dark:bg-gray-800" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20220729/original/pngtree-abstract-background-white-and-light-gray-silver-style-modern-technology-geometric-picture-image_1859880.jpg")', opacity: 0.99 }}>
          <div className="w-full md:w-48">
            <div className="py-2">
              <h2 className="px-4 text-gray-900 text-lg font-semibold uppercase mb-2">
                POPULAR
              </h2>
              <Link
                to="/sort/popularity"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                ยอดนิยม
              </Link>
              <Link
                to="/sort/popularity"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                ขายดีที่สุด
              </Link>
              <Link
                to="/sort/popularity"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                วางจำหน่ายล่าสุด
              </Link>
              <Link
                to="/sort/popularity"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                ใกล้วางจำหน่าย
              </Link>
              <div className="border-t border-gray-300 dark:border-gray-600 my-2"></div>
              <h2 className="px-4 text-gray-900 text-lg font-semibold uppercase mb-2">
                Promotion & Event
              </h2>
              <Link
                to="/promotion"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                ข้อเสนอพิเศษ
              </Link>
              <Link
                to="/event"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                เทศกาลลดราคา
              </Link>
            </div>
          </div>
          <div className="w-1 bg-gray-300 dark:bg-gray-700 my-2 mx-4 md:mx-0 md:my-0 md:h-full"></div>
          <div className="w-full md:w-48 mt-4 md:mt-0 md:ml-4">
            <div className="py-1">
              <h2 className="px-4 text-gray-900 text-lg font-semibold uppercase mb-2">
                วิชา
              </h2>
              <Link
                to="/new/section"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                คณิตศาสตร์
              </Link>
              <Link
                to="/new/section"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                วิทยาศาสตร์
              </Link>
              <Link
                to="/new/section"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                อังกฤษ
              </Link>
              <Link
                to="/new/section"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                ภาษาไทย
              </Link>
              <Link
                to="/new/section"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                สังคมศึกษา
              </Link>
              <Link
                to="/new/section"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                คอมพิวเตอร์
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
