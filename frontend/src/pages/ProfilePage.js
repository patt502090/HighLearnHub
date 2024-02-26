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
    <div className="background-image">
      <Navbar />
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>โปรไฟล์ของฉัน</title>
      </Helmet>
      <div
        className="h-screen flex flex-col items-center justify-items-center pt-24 w-80 sm:w-full mx-auto"
      >
        <div className="border border-gray-300 shadow-lg rounded-lg bg-white bg-opacity-90 p-8 w-full sm:w-5/6 md:w-3/4 lg:w-[80%]">
          <div className="flex flex-col items-center mx-auto">
            <div className="h-40 w-40 lg:h-52 lg:w-52 overflow-hidden rounded-full mb-4 relative">
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

            <div className="">
              <p className="font-bold text-3xl max-lg:text-xl">
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

          <div className="mt-8">
            <h2 className="text-lg font-bold">ข้อมูลส่วนตัว</h2>
            <button
                onClick={handleEditClick}
                className="text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                แก้ไขข้อมูลส่วนตัว
              </button>
            <div className="border-b border-gray-400 mt-4"></div>
            <div className="mt-4">
              <p className="text-base text-gray-700">
                <span className="font-bold">ชื่อ: </span>
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
              <p className="text-base text-gray-700">
                <span className="font-bold">เบอร์โทรศัพท์: </span>
                {userData && `${userData.phonenum}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
