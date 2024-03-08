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
import conf from "../conf/main";

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
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header>
        <div>
          <div className="bg-gray-400">
            <div className="container mx-auto flex justify-between items-center p-2">
              <div className="flex">
                <Link to={"/home"}>             
                  <img src={conf.urlPrefix+"/uploads/Logo_With_Text_1585914ac6.png?fbclid=IwAR0AeIW_KEM3fzgR6qn-bxt1uVYoDH2kwquZaCHfHT7LZ8fSgP18x9OHrCE"} alt="Logo" className="h-11 w-auto ml-2" />
                </Link>
              </div>
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
                      <svg onClick={() => navigate(`/profile/${user.id}`)} className=" max-lg:hidden cursor-pointer ml-2 w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
