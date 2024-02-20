import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
function ProfilePage() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(
          `http://localhost:1337/api/users/${id}`
        );
        const userData = await userResponse.json();
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-gray-100 p-4">
      <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
        <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full">
          <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
            <img src={userData && userData.image} alt="Profile" />
          </div>

          <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
            <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
              Name: {userData && `${userData.first_name} ${userData.last_name}`}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <List>
            <ListItem disablePadding href="">
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
          <div
            className="border-r-2 border-black h-14 mx-8"
            style={{ height: "60px" }}
          ></div>
          <Link to="/history">
          <List>
            <ListItem disablePadding href="">
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

        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:mt-10">
            <div className="flex flex-col sm:w-1/3">
              <div className="py-3 sm:order-none order-3">
                <h2 className="text-lg font-poppins font-bold text-top-color">
                  ข้อมูลส่วนตัว
                </h2>
                <div
                  style={{ borderBottom: "1px solid black", marginTop: "10px" }}
                ></div>
                <div>
                  <div className="flex items-center my-1">
                    <p>{userData && userData.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
