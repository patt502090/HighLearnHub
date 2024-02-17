import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import SidebarWithBurgerMenu from "./Sidebar";
import { Button, Modal } from "flowbite-react";
import { AuthContext, ContextProvider } from "../context/Auth.context";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [showingSearchingBar, setShowingSearchingBar] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSubjectFilterModal, setShowSubjectFilterModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);

    toast.success("ออกจากระบบสำเร็จ!");
    setTimeout(() => {
      navigate("/login");
    });
  };

  const handleSubjectFilter = (subject) => {
    setSelectedSubject(subject);
    setShowSubjectFilterModal(false);
  };

  return (
    <ContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <header className="bg-gray-500">
          <div className="container mx-auto flex justify-between items-center p-4">
            <SidebarWithBurgerMenu
              userData={user}
              setShowingSearchingBar={setShowingSearchingBar}
            />
            {user ? (
              <Button
                gradientDuoTone="purpleToBlue"
                onClick={() => setShowLogoutModal(true)}
              >
                ออกจากระบบ ({user.username})
              </Button>
            ) : (
              <Button gradientDuoTone="purpleToBlue" className="px-3">
                <NavLink to="/login" className="hover:underline">
                  เข้าสู่ระบบ
                </NavLink>
              </Button>
            )}
          </div>
        </header>

        <body className="bg-gray-400">
          <div className="container mx-auto flex justify-center items-center h-30 p-4">
            <button
              type="button"
              className="flex text-black border-none justify-center font-medium rounded-full text-sm px-5 py-2.5 text-center"
              onClick={() => setShowSubjectFilterModal(true)}
            >
              <svg
                className="w-6 h-6 text-black dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
              </svg>
              ตัวกรอง
            </button>
            {showingSearchingBar ? (
              <form className="flex items-center justify-center">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="w-64 p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Courses"
                    required
                  />
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
        </body>

        <Modal
          show={showSubjectFilterModal}
          size="md"
          onClose={() => setShowSubjectFilterModal(false)}
          popup
        >
          <Modal.Header>กรองตามวิชา</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <div>
                <label className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" // เพิ่ม focus:ring เพื่อสร้างเอฟเฟกต์เมื่อช่องติ๊กถูกเลือก
                    checked={selectedSubject === "ฟิสิก"}
                    onChange={() => handleSubjectFilter("ฟิสิก")}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    ฟิสิก
                  </span>
                </label>
                <label className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" // เพิ่ม focus:ring เพื่อสร้างเอฟเฟกต์เมื่อช่องติ๊กถูกเลือก
                    checked={selectedSubject === "คอม"}
                    onChange={() => handleSubjectFilter("คอม")}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    คอม
                  </span>
                </label>
              </div>
              <div>
                <button
                  className={`bg-red-500 text-white px-4 py-2 rounded-lg mt-3 ml-auto`}
                  onClick={() => handleSubjectFilter("ค้นหา")}
                >
                  ค้นหา
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={showLogoutModal}
          size="md"
          onClose={() => setShowLogoutModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ต้องการออกจากระบบ ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleLogout}>
                  ออกจากระบบ
                </Button>
                <Button
                  color="gray"
                  className="px-6"
                  onClick={() => setShowLogoutModal(false)}
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </ContextProvider>
  );
};

export default Navbar;
