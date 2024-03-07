import { Helmet } from "react-helmet";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import backgroundImage from "../assets/background.png";
import { ContextProvider } from "../context/Auth.context";
import React, { useState, useEffect } from "react";
import conf from "../conf/main";
import ax from "../conf/ax";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [onlineSelling, setOnlineSelling] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const [todayLogin, setTodayLogin] = useState();
  const [loading, setLoading] = useState(false);
  const [cData, setcData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [course, setCourse] = useState();
  const [totalProfits, setTotalProfits] = useState(0);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const response = await ax.get(
          `${conf.apiUrlPrefix}/users?populate[bookings][populate]=course&populate=image`
        );
        setcData(response.data);
      };
      fetchData();
      fetchCourse();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchCourse = async () => {
    const req = await ax.get(`${conf.apiUrlPrefix}/courses`)
    setCourse(req.data.data)
    req.data.data.forEach((i) => setTotalProfits((prev) => prev + (i.attributes.price * i.attributes.amount)));
  }

  const topCustomers = cData
    .sort((a, b) => {
      const totalAmountA = a.bookings.reduce(
        (total, booking) => total + (booking.course?.price || 0),
        0
      );
      const totalAmountB = b.bookings.reduce(
        (total, booking) => total + (booking.course?.price || 0),
        0
      );
      return totalAmountB - totalAmountA;
    })
    .slice(0, 8);

  const findTotalUsers = async () => {
    try {
      const fetchUsers = await ax.get(
        `${conf.apiUrlPrefix}/users?populate=login_streak`
      );
      const filteredUsers = fetchUsers.data.filter((user) => {
        if (user.login_streak?.lastLogin) {
          const lastLoginDate = user.login_streak.lastLogin.slice(0, 10);
          return lastLoginDate === formattedDate.slice(0, 10);
        }
        return false;
      });
      setTotalUsers(fetchUsers.data);
      setTodayLogin(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findTotalUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const onlineSellingResponse = await ax.get(
          `${conf.apiUrlPrefix}/courses?populate=image&filters[study_type][$eq]=Online&sort=amount:desc&pagination[pageSize]=10&populate=videos`
        );
        const onlineSellingData = onlineSellingResponse.data.data.map(
          (course) => {
            const totalDurationSeconds = course.attributes.videos.data.reduce(
              (totalDuration, video) =>
                totalDuration + video.attributes.duration,
              0
            );

            const minutes = Math.floor(totalDurationSeconds / 60);
            const seconds = Math.floor(totalDurationSeconds % 60);

            return {
              id: course.id,
              title: course.attributes.title,
              price: course.attributes.price,
              amount: course.attributes.amount,
              description: course.attributes.description,
              image:
                `${conf.urlPrefix}`+
                course.attributes.image.data.attributes.url,
              duration: { minutes, seconds },
            };
          }
        );

        setOnlineSelling(onlineSellingData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const onlineSellingResponse = await ax.get(
          `${conf.apiUrlPrefix}/courses?populate=image&filters[study_type][$eq]=Online&sort=amount:desc&pagination[pageSize]=10&populate=videos`
        );
        const onlineSellingData = onlineSellingResponse.data.data.map(
          (course) => {
            const totalDurationSeconds = course.attributes.videos.data.reduce(
              (totalDuration, video) =>
                totalDuration + video.attributes.duration,
              0
            );

            const minutes = Math.floor(totalDurationSeconds / 60);
            const seconds = Math.floor(totalDurationSeconds % 60);

            return {
              id: course.id,
              title: course.attributes.title,
              price: course.attributes.price,
              amount: course.attributes.amount,
              description: course.attributes.description,
              image:
                conf.urlPrefix +
                course.attributes.image.data.attributes.url,
              duration: { minutes, seconds },
            };
          }
        );

        setOnlineSelling(onlineSellingData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ContextProvider>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>เเดชบอร์ด</title>
        </Helmet>
        <Navbar />
        <div className="px-4 mx-auto background-image w-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-[90px]">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.8-3.1a5.5 5.5 0 0 0-2.8-6.3c.6-.4 1.3-.6 2-.6a3.5 3.5 0 0 1 .8 6.9Zm2.2 7.1h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1l-.5.8c1.9 1 3.1 3 3.1 5.2ZM4 7.5a3.5 3.5 0 0 1 5.5-2.9A5.5 5.5 0 0 0 6.7 11 3.5 3.5 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4c0 1.1.9 2 2 2h.5a6 6 0 0 1 3-5.2l-.4-.8Z"
                  clip-rule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-bold mb-2">ผู้ใช้ในระบบ</h3>
              <div className="flex justify-between w-full">
                <p className="text-center mx-auto font-medium">
                  {totalUsers?.length} คน
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">เข้าสู่ระบบวันนี้</h3>
              <div className="flex justify-between w-full">
                <p className="text-gray-700 ml-2">{todayLogin?.length} คน</p>
                {(todayLogin?.length / totalUsers?.length) * 100 >= 50 ? (
                  <>
                    <p className="text-green-500 mr-2">
                      {(todayLogin?.length / totalUsers?.length) * 100}%
                    </p>
                    <svg
                      class="w-6 h-6 text-green-500 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v13m0-13 4 4m-4-4-4 4"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <p className="text-red-500 mr-2">
                      {(todayLogin?.length / totalUsers?.length) * 100}%
                    </p>
                    <svg
                      class="w-6 h-6 text-red-500 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19V5m0 14-4-4m4 4 4-4"
                      />
                    </svg>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z"
                  clip-rule="evenodd"
                />
              </svg>

              <h3 className="text-lg font-semibold mb-2">ยอดขายรวม</h3>
              <div className="flex justify-center w-full">
                <p className=" text-green-500 ml-2">{totalProfits} บาท</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4c0-.6.4-1 1-1h1.5c.5 0 .9.3 1 .8L7.9 6H19a1 1 0 0 1 1 1.2l-1.3 6a1 1 0 0 1-1 .8h-8l.2 1H17a3 3 0 1 1-2.8 2h-2.4a3 3 0 1 1-4-1.8L5.7 5H5a1 1 0 0 1-1-1Z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">คอร์สในระบบ</h3>
              <div className="flex justify-center w-full">
                <p className="text-gray-700 ml-2">{course?.length} คอร์ส</p>
              </div>
            </div>
            
          </div>
          <div className="lg:flex">
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2 mb-3"
              style={{ marginTop: "20px" }}
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="border p-4 grid grid-cols-4 items-center">
                  <div className="col-span-2 text-center font-semibold">ชื่อคอร์ส</div>
                  <div className="text-center font-semibold">ราคา</div>
                  <div className="text-center font-semibold">การสั่งซื้อ</div>
                </div>
                {onlineSelling?.map((course) => (
                  <div
                    key={course.id}
                    className="border p-4 grid grid-cols-4 items-center"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-40 h-20 object-cover mr-4"
                    />
                    <h4 className="font-semibold max-lg:font-medium mb-1 pl-1 max-lg:text-sm">{course.title}</h4>
                    <p className="text-gray-700 text-center max-lg:text-sm">{course.price} บาท</p>
                    <div className="text-center max-lg:text-sm">{course.amount} ครั้ง</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3 overflow-x-auto w-full lg:w-1/2 h-full mt-[20px] lg:ml-[20px] " >
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3 text-base">ชื่อผู้ใช้</th>
                    <th className="px-5 py-3 text-base">
                      ชื่อ-สกุล
                    </th>
                    <th className="px-5 py-3 text-base">
                      ยอดรวม
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {topCustomers.map((item, index) => (
                    <tr key={index} className="">
                      <td
                        onClick={() => [
                          setOpenModal(true),
                          setProfileId(item.id),
                        ]}
                        className="flex items-center border-b border-gray-200 bg-white px-5 py-5 text-sm"
                      >
                        <div className="h-8 w-8 mr-2 flex-shrink-0">
                          {item.image ? (
                            <img
                              className="object-cover w-8 h-8 rounded-full"
                              src={`${conf.urlPrefix}${item.image.url}`}
                              alt=""
                            />
                          ) : (
                            <svg
                              className="h-full w-full rounded-full text-gray-600 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="whitespace-no-wrap">{item.username}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white  px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{`${item.first_name} ${item.last_name}`}</p>
                      </td>
                    
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {item.bookings.reduce(
                            (total, booking) =>
                              total + (booking.course?.price || 0),
                            0
                          )}{" "}
                          บาท
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
        </div>
      </ContextProvider>
    </>
  );
}

export default Dashboard;
