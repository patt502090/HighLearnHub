import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Helmet } from "react-helmet";
import { Transition } from "react-transition-group";
import { CircularProgress } from "@mui/material";
import { ContextProvider } from "../context/Auth.context";

function ProfilePage() {
  const [userData, setUserData] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [img, setImg] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (newImage) {
      setLoading(true);
      setImg(URL.createObjectURL(newImage[0]));
    }
    setLoading(false);
  }, [newImage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userResponse = await ax.get(
        `${conf.apiUrlPrefix}/users/me?populate=image`
      );
      setUserData(userResponse.data);
      setImg(`${conf.urlPrefix}${userResponse.data.image.url}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setEditedUserData(userData);
    setNewImage(null);
    showEditForm ? setShowEditForm(false) : setShowEditForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await ax.put(`${conf.apiUrlPrefix}/users/${id}`, {
        first_name: editedUserData.first_name,
        last_name: editedUserData.last_name,
        phonenum: editedUserData.phonenum,
        email: editedUserData.email,
        line_id: editedUserData.line_id,
      });

      if (newImage) {
        const formData = new FormData();
        formData.append("field", "image");
        formData.append("ref", "plugin::users-permissions.user");
        formData.append("refId", id);
        formData.append("files", newImage[0]);
        ax.post(conf.apiUrlPrefix + `/upload`, formData)
          .then((response) => {
            console.log(response);
            sessionStorage.setItem(
              "profileURL",
              `${conf.urlPrefix}${response.data[0].url}`
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
      setEditedUserData({});
      setShowEditForm(false);
      fetchData();
      setTimeout(() => {
        setLoading(false);
        navigate(`/profile/${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleCancel = () => {
    setEditedUserData({});
    setShowEditForm(false);
  };

  if (loading) {
    return (
      <div className="background-image">
        <div className="h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <ContextProvider>
      <div className="background-image">
        <Navbar />
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>โปรไฟล์ของฉัน</title>
        </Helmet>
        <div className="h-screen flex flex-col items-center justify-items-center pt-24 w-80 sm:w-full mx-auto">
          <div className="background-profile border border-gray-300 shadow-lg rounded-lg bg-white bg-opacity-90 p-8 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 relative">
            <div className="flex">
              <button
                onClick={handleEditClick}
                className="text-black-500 hover:underline focus:outline-none focus:ring-2 focus:ring-black-600 focus:ring-opacity-20 absolute top-0 right-0 mr-4 mt-4"
              >
                <svg
                  class="lg:h-[2.2em] lg:w-[2.2em] h-[1.5em] w-[1.5em] inline text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8Zm4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5L9 13Zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="lg:text-base text-sm">ปรับเเต่ง</span>
              </button>
            </div>

            <div className="rounded-xl flex flex-col items-center mx-auto">
              <div className="h-40 w-40 lg:h-52 mt-4 lg:w-52 overflow-hidden rounded-full mb-4 relative">
                <img
                  className="object-cover w-full h-full"
                  src={
                    img
                      ? img
                      : "https://static.thenounproject.com/png/642902-200.png"
                  }
                  alt=""
                />
              </div>
              <div className="mb-4">
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
                  className={`mt-8 px-4 py-2  ${
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
                          htmlFor="lineID"
                          className="font-bold text-gray-700 block mb-1"
                        >
                          ไอดีไลน์
                        </label>
                        <input
                          id="lineID"
                          type="text"
                          value={editedUserData.line_id}
                          onChange={(e) =>
                            setEditedUserData({
                              ...editedUserData,
                              line_id: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="about"
                          className="font-bold text-gray-700 block mb-1"
                        >
                          เกี่ยวกับฉัน
                        </label>
                        <textarea
                          id="about"
                          type="text"
                          value={editedUserData.about}
                          onChange={(e) =>
                            setEditedUserData({
                              ...editedUserData,
                              about: e.target.value,
                            })
                          }
                          className="border h-32 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          อัพโหลดรูป
                        </label>
                        <input
                          id="imageInput"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewImage(e.target.files)}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end max-lg:justify-between">
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
              <div className="flex justify-start justify-items-center items-center">
                <svg
                  class="w-8 h-8 inline text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h2 className="inline text-lg font-bold">ข้อมูลส่วนตัว</h2>
              </div>
              <div className="border-b border-gray-400 mt-4"></div>
              <div className="mt-4 space-y-4">
                <p className="text-base text-gray-700">
                  <span className="font-bold">ชื่อ: </span>
                  {userData && `${userData.first_name} ${userData.last_name}`}
                </p>
                <p className="text-base text-gray-700">
                  <span className="font-bold">เบอร์โทรศัพท์: </span>
                  {userData &&
                    `${userData.phonenum ? userData.phonenum : "ไม่ระบุ"}`}
                </p>
                <p className="text-base text-gray-700">
                  <span className="font-bold">ไอดีไลน์: </span>
                  {userData &&
                    `${userData.line_id ? userData.line_id : "ไม่ระบุ"}`}
                </p>
                <p className="text-base text-gray-700">
                  <span className="font-bold">อีเมล: </span>
                  {userData && `${userData.email ? userData.email : "ไม่ระบุ"}`}
                </p>
                <p className="text-base text-gray-700">
                  <span className="font-bold">เกี่ยวกับฉัน: </span>
                  {userData && `${userData.about ? userData.about : "ไม่ระบุ"}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    </ContextProvider>
  );
}

export default ProfilePage;
