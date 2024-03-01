import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarWithBurgerMenu from "./Sidebar";
import { Button, Modal } from "flowbite-react";
import { AuthContext } from "../context/Auth.context";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Searchbar from "./Searchbar";
import Filter from "./Filter"

const Navbar = ({ data }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { state: ContextState, logout } = useContext(AuthContext);
  const { user } = ContextState;
  const profileURL = sessionStorage.getItem("profileURL")
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    sessionStorage.removeItem("profileURL");

    toast.success("ออกจากระบบสำเร็จ!");
    setTimeout(() => {
      navigate("/login");
    });
  };

  return (
    <>      <Toaster position="top-center" reverseOrder={false} />
      <header>
        <div>
          <div className="bg-gray-400">
            <div className="container mx-auto flex justify-between items-center p-2">
              <div className="flex">
                <Link to={"/home"}>
                  <img src="https://media.discordapp.net/attachments/705005230944813076/1208313872990347264/HLH_2.png?ex=65e2d4fc&is=65d05ffc&hm=10fa3e09ca49cc6796caf9f0ed0e5b4518a1a1708628c840c6c0d821d89555e7&=&format=webp&quality=lossless&width=625&height=312" alt="Logo" className="h-11 w-auto ml-2" />
                </Link>
              </div>
              {(data) ? <Filter/> : <></>}
              {user ? (
                <div className="flex justify-items-center items-center">
                  {(data) ? <Searchbar data={data} /> : <></>}
                  <div>
                    {profileURL ?
                      <img
                        className="max-lg:hidden ml-2 object-cover w-8 h-8 rounded-full cursor-pointer"
                        src={profileURL}
                        alt='proflie'
                        onClick={() => navigate(`/profile/${user.id}`)}>
                      </img>
                      :
                      <svg onClick={() => navigate(`/profile/${user.id}`)} class=" max-lg:hidden cursor-pointer ml-2 w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    }
                  </div>
                  <SidebarWithBurgerMenu
                    userData={user}
                    logout={setShowLogoutModal}
                    profileURL={profileURL}
                  />
                </div>

              ) : (
                <Button gradientDuoTone="purpleToBlue" className="px-3">
                  <NavLink to="/login" className="hover:underline">
                    เข้าสู่ระบบ
                  </NavLink>
                </Button>
              )}
            </div>
          </div>
        </div>
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
        <div className="h-4 bg-gray-300">
        </div>
      </header>
    </>
  );
};

export default Navbar;
