import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import SidebarWithBurgerMenu from "./Sidebar";
import { Button, Modal, ModalHeader } from "flowbite-react";
import { AuthContext, ContextProvider } from "../context/Auth.context";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const proflieID = 1

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


  return (
    <ContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <header className="bg-highlearnhub-firstgray">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex">
              <SidebarWithBurgerMenu
                userData={user}
              />
              <img src="https://media.discordapp.net/attachments/705005230944813076/1208313872990347264/HLH_2.png?ex=65e2d4fc&is=65d05ffc&hm=10fa3e09ca49cc6796caf9f0ed0e5b4518a1a1708628c840c6c0d821d89555e7&=&format=webp&quality=lossless&width=625&height=312" alt="Logo" className="h-11 w-auto ml-2" />
            </div>
            {user ? (
              <div className="flex">
                <NavLink to={`/profile/${proflieID}`} className="hover:underline">       
                <Button
                  color="dark" pill
                  className="mr-2"
                >
                  <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                  </svg>
                  {user.username}
                </Button>
                </NavLink>
                <Button
                  color="dark" pill
                  onClick={() => setShowLogoutModal(true)}
                >
                  ออกจากระบบ
                </Button>
              </div>
            ) : (
              <Button gradientDuoTone="purpleToBlue" className="px-3">
                <NavLink to="/login" className="hover:underline">
                  เข้าสู่ระบบ
                </NavLink>
              </Button>
            )}
          </div>
        </header>

        <body className="bg-highlearnhub-secondgray">
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
                onClick={() => setShowSubjectFilterModal(false)}
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
          <ModalHeader>Filter</ModalHeader>
          <Modal.Body>
            <div className="text-center">
              {" "}
              กรองตามวิชา
              <div>
                <label
                  className="inline-flex items-center mt-3"
                  style={{ display: "block" }}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    ฟิสิกส์
                  </span>
                </label>
                <label
                  className="inline-flex items-center mt-3"
                  style={{ display: "block" }}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    คอม
                  </span>
                </label>
              </div>
              <div>
                กรองตามราคา
                <div>
                  <label
                    className="inline-flex items-center mt-3"
                    style={{ display: "block" }}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      0-1000
                    </span>
                  </label>
                  <label
                    className="inline-flex items-center mt-3"
                    style={{ display: "block" }}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      1000-2000
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <button
                  className={`bg-red-500 text-white px-4 py-2 rounded-lg mt-3 ml-auto`}
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
