import React, { useState, useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarWithBurgerMenu from "./Sidebar";
import { Button, Modal} from "flowbite-react";
import { AuthContext, ContextProvider } from "../context/Auth.context";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const proflieID = 1

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
        <header className="bg-gray-400">
          <div className="container mx-auto flex justify-between items-center p-4 ">
            <div className="flex">
              <SidebarWithBurgerMenu
                userData={user}
              />
              <Link to={"/home"}>
                <img src="https://media.discordapp.net/attachments/705005230944813076/1208313872990347264/HLH_2.png?ex=65e2d4fc&is=65d05ffc&hm=10fa3e09ca49cc6796caf9f0ed0e5b4518a1a1708628c840c6c0d821d89555e7&=&format=webp&quality=lossless&width=625&height=312" alt="Logo" className="h-11 w-auto ml-2" />
              </Link>
            </div>
            {user ? (
              <div className="flex">
                <NavLink to={`/profile/${proflieID}`} className="hover:underline">
                  <Button
                    color="dark" pill
                    className="mr-2 hover:underline"
                  >
                    <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                    </svg>
                    {user.username}
                  </Button>
                </NavLink>
                <Button
                  color="dark" pill
                  className="hover:underline"
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
    </ContextProvider>
  );
};

export default Navbar;
