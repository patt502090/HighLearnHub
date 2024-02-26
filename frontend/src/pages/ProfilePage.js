import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.png";
import Navbar from "../components/Navbar";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Helmet } from "react-helmet";
import { Transition } from "react-transition-group";

function ProfilePage() {
  const [userData, setUserData] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const userResponse = await ax.get(`${conf.apiUrlPrefix}/users/me`);
      setUserData(userResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setEditedUserData(userData);
    setNewImage(null);
    setShowEditForm(true);
  };

  const handleSave = async () => {
    try {
      const response = await ax.put(`${conf.apiUrlPrefix}/users/${id}`, {
        first_name: editedUserData.first_name,
        last_name: editedUserData.last_name,
        phonenum: editedUserData.phonenum,
        email: editedUserData.email,
      });

      if (newImage) {
        const formData = new FormData();
        formData.append("files", newImage);
        formData.append("refId", id);
        formData.append("ref", "user");
        formData.append("field", "avatar");

        await ax.post(`${conf.urlPrefix}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchData();
      setEditedUserData({});
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleCancel = () => {
    setEditedUserData({});
    setShowEditForm(false);
  };

  return (
    <div>
      <Navbar className="py-4" />
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>โปรไฟล์ของฉัน</title>
      </Helmet>
      <div
        className="flex flex-col items-center justify-items-center pt-24 w-80 sm:w-full mx-auto bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="border border-gray-300 shadow-lg rounded-lg bg-white bg-opacity-90 p-8 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 relative">
          <button
            onClick={handleEditClick}
            className="text-black-500 hover:underline focus:outline-none focus:ring-2 focus:ring-black-600 focus:ring-opacity-20 absolute top-0 right-0 mr-4 mt-4"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="2em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
              ></path>
            </svg>
          </button>

          <div className="flex flex-col items-center ">
            <div className="h-40 w-40 overflow-hidden rounded-full mb-4 relative shadow-md flex items-center justify-center">
              <img
                className="object-cover w-full h-full"
                src={
                  newImage
                    ? URL.createObjectURL(newImage)
                    : "https://static.thenounproject.com/png/642902-200.png"
                }
                alt=""
              />
            </div>

            <div className="ml-5">
              <p className="font-bold text-3xl">
                {userData && `${userData.first_name} ${userData.last_name}`}
              </p>
            </div>
          </div>

          <Transition
            in={showEditForm}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <div
                className={`mt-8 px-4 py-2 border-t border-gray-400 ${
                  state === "entered" ? "" : "hidden"
                }`}
              >
                <h2 className="text-lg font-bold mb-2">แก้ไขข้อมูลส่วนตัว</h2>
                <div className="border-b border-gray-400"></div>
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="font-bold text-gray-700 block mb-1"
                      >
                        ชื่อ
                      </label>
                      <input
                        id="first_name"
                        type="text"
                        value={editedUserData.first_name}
                        onChange={(e) =>
                          setEditedUserData({
                            ...editedUserData,
                            first_name: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="font-bold text-gray-700 block mb-1"
                      >
                        นามสกุล
                      </label>
                      <input
                        id="last_name"
                        type="text"
                        value={editedUserData.last_name}
                        onChange={(e) =>
                          setEditedUserData({
                            ...editedUserData,
                            last_name: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phonenum"
                        className="font-bold text-gray-700 block mb-1"
                      >
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        id="phonenum"
                        type="text"
                        value={editedUserData.phonenum}
                        onChange={(e) =>
                          setEditedUserData({
                            ...editedUserData,
                            phonenum: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="font-bold text-gray-700 block mb-1"
                      >
                        อีเมล
                      </label>
                      <input
                        id="email"
                        type="text"
                        value={editedUserData.email}
                        onChange={(e) =>
                          setEditedUserData({
                            ...editedUserData,
                            email: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="imageInput"
                        className="font-bold text-gray-700 block mb-1 cursor-pointer"
                      >
                        อัปโหลดรูป
                      </label>
                      <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      บันทึก
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Transition>

          <div className="mt-8 px-4 py-2 border-t border-gray-400">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="ml-2">ข้อมูลส่วนตัว</p>
                </ListItemButton>
              </ListItem>
            </List>
            <Link to="/history">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.25 8.75h-4.5V7.5c0-.69-.56-1.25-1.25-1.25h-3a1.25 1.25 0 0 0-1.25 1.25V8.75h-4.5a1.25 1.25 0 0 0-1.25 1.25v10a1.25 1.25 0 0 0 1.25 1.25h13.5a1.25 1.25 0 0 0 1.25-1.25v-10a1.25 1.25 0 0 0-1.25-1.25zm-8.75-1.25h3a.25.25 0 0 1 .25.25v1h-3v-1a.25.25 0 0 1 .25-.25zm-7.25 12.5v-10h13.5v10h-13.5z" />
                      <path d="M7 11.75h2.5v1.5H7zm0 3.25h10v1.5H7z" />
                    </svg>
                    <p className="ml-2">ประวัติการสั่งซื้อ</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
          </div>

          <div className="mt-8 px-4 py-2 border-t border-gray-400">
            <h2 className="text-lg font-bold">ข้อมูลส่วนตัว</h2>
            <div className="border-b border-gray-400 mt-4"></div>
            <div className="mt-4">
              <p className="text-base text-gray-700">
                <span className="font-bold">ชื่อ-นามสกุล: </span>
                {userData && `${userData.first_name} ${userData.last_name}`}
              </p>
              <p className="text-base text-gray-700">
                <span className="font-bold">เบอร์โทรศัพท์: </span>
                {userData && `${userData.phonenum}`}
              </p>
              <p className="text-base text-gray-700">
                <span className="font-bold">อีเมล: </span>
                {userData && `${userData.email}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
