import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.png";
import Navbar from "../components/Navbar";

function ProfilePage() {
  const [userData, setUserData] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(
          `http://localhost:1337/api/users/${id}`
        );
        const userData = await userResponse.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setEditedUserData(userData);
    setNewImage(null); // Reset image when edit button is clicked
  };

  const fetchData = async () => {
    try {
      const userResponse = await fetch(`http://localhost:1337/api/users/${id}`);
      const userData = await userResponse.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUserData),
      });
      const data = await response.json();
      console.log("Updated user data:", data);
      
      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);
        const imageResponse = await fetch(`http://localhost:1337/api/users/${id}`, {
          method: "POST",
          body: formData,
        });
        const imageData = await imageResponse.json();
        console.log("Uploaded new image:", imageData);
      }
      
      fetchData();
      setEditedUserData({});
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleCancel = () => {
    setEditedUserData({});
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center justify-items-center pt-24 w-80 sm:w-full mx-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="border border-gray-300 shadow-lg rounded-lg bg-white bg-opacity-90 p-8 w-full sm:w-5/6 md:w-3/4 lg:w-2/3">
          <div className="flex flex-col items-center ">
            <div className="h-40 w-40 overflow-hidden rounded-full mb-4 relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="hidden"
                id="imageInput"
              />
              <label
                htmlFor="imageInput"
                className="cursor-pointer"
              >
                <img
                  className="object-cover w-full h-full"
                  src={
                    newImage
                      ? URL.createObjectURL(newImage)
                      : "https://static.thenounproject.com/png/642902-200.png"
                  }
                  alt=""
                />
              </label>
            </div>

            <div className="ml-5">
              <p className="font-bold text-3xl">
                {userData && `${userData.first_name} ${userData.last_name}`}
              </p>
              <button
                onClick={handleEditClick}
                className="text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              >
                แก้ไขข้อมูลส่วนตัว
              </button>
            </div>
          </div>
          {Object.keys(editedUserData).length > 0 && (
            <div className="mt-8">
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
                      htmlFor="contact"
                      className="font-bold text-gray-700 block mb-1"
                    >
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      id="contact"
                      type="text"
                      value={editedUserData.contact}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          contact: e.target.value,
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
                </div>
                <div className="mt-4">
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

          <div className="mt-8">
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

          <div className="mt-8">
            <h2 className="text-lg font-bold">ข้อมูลส่วนตัว</h2>
            <div className="border-b border-gray-400 mt-4"></div>
            <div className="mt-4">
              <p className="text-base text-gray-700">
                <span className="font-bold">ชื่อ-นามสกุล: </span>
                {userData && `${userData.first_name} ${userData.last_name}`}
              </p>
              <p className="text-base text-gray-700">
                <span className="font-bold">เบอร์โทรศัพท์: </span>
                {userData && `${userData.contact}`}
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
