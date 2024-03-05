import { Tabs } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import { AuthContext } from "../context/Auth.context";
import { useContext } from "react";
import { MdVideocam } from "react-icons/md";
import React, { useState, useEffect } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import ReactPlayer from "react-player";
export default function BasicTabs(props) {
  const { state: ContextState } = useContext(AuthContext);
  const { userRole } = ContextState;
  const data = props.data.attributes;
  const [firstVideo, setFirstVideo] = useState(null);
  const id = props.data.id;
  const [review, setReview] = useState("");
  const [totalDurations, setTotalDurations] = useState(null);
  console.log(id)
  useEffect(() => {
    fetchFirstVideo();
  }, [id]);

  function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    let formattedTime = "";
    if (hours > 0) {
      formattedTime += hours + " ชั่วโมง ";
    }
    if (minutes > 0 || hours > 0) {
      formattedTime += minutes + " นาที ";
    }
    formattedTime += remainingSeconds + " วินาที";

    return formattedTime;
  }

  const fetchFirstVideo = async () => {
    try {
      const response = await ax.get(
        `${conf.apiUrlPrefix}/videos?populate=course&filters[course][id][$eq]=${id}`
      );
      const videos = response?.data?.data;
      if (videos && videos.length > 0) {
        setFirstVideo(videos[0]?.attributes.url);
      }
      console.log(videos);
      const durations = videos.map((video) => {
        return video.attributes.duration;
      });
      const totalDuration = durations.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      formatTime(totalDuration);
      setTotalDurations(formatTime(totalDuration));
    } catch (error) {
      console.error("Error fetching first video: ", error);
    }
  };

  return (
    <>
      {userRole === "admin" ? (
        <div style={{ position: "relative" }}>
          <div className="absolute top-14 sm:top-0 right-0">
            <button
              onClick={() => props.OnEdition(true)}
              className="px-3 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:bg-blue-600"
            >
              <IoSettingsOutline />
            </button>
            <button
              onClick={() => props.OnDelete(true)}
              className="px-3 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:bg-red-600 ml-2"
            >
              <ImBin />
            </button>
          </div>
          <Tabs aria-label="Default tabs" className="w-full justify-center">
            <Tabs.Item title="รายละเอียด" icon={MdDashboard}>
              <ul
                class="justify-between grid lg:grid-cols-2  text-base font-base text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                style={{ justifyContent: "center" }}
              >
                <li class="justify-between text-center gap-8 w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center">
                  <div>
                    <svg
                      class="w-8 h-8 inline-block mr-2 text-gray-500 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z" />
                    </svg>
                    <span className="font-medium gap-8 ">วิชา:</span>
                    {`' '${data.subject}`}
                  </div>
                </li>
                <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div>
                    <svg
                      class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">ผู้สอน: </span>
                    {data.instructor_name}
                  </div>
                </li>
                <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center ">
                  <div>
                    <svg
                      class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">รูปแบบ: </span>
                    {data.study_type === "Online" ? "ออนไลน์" : "สดออนไลน์"}
                  </div>
                </li>
                <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="mr-7">
                    <svg
                      class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {/* {data.videos.data[0].attributes.duration} ชั่วโมง */}
                    <span className="font-medium">ระยะเวลา: </span>25 ชั่วโมง
                  </div>
                </li>
                <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center">
                  <div>
                    <svg
                      class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">
                      {data.study_type === "Online"
                        ? "ยอดสั่งซื้อ: "
                        : "นักเรียน: "}
                    </span>
                    {data.amount}
                    {data.maxamount ? `/${data.maxamount}` : ""} คน
                  </div>
                </li>
              </ul>
            </Tabs.Item>
            <Tabs.Item title="บทเรียน" icon={HiAdjustments}>
              <h1 className="whitespace-pre-line text-center mb-2 text-lg font-medium">
                บทเรียนทั้งหมดในคอร์สนี้ ประกอบด้วย
              </h1>
              <div class="w-auto p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                <span class="whitespace-pre-line text-center mb-2 text-sm font-base tracking-tight text-gray-900 dark:text-white">
                  {data.detail}
                </span>
              </div>
            </Tabs.Item>
            <Tabs.Item title="วิดีโอ" icon={MdVideocam}>
              <h1 className="whitespace-pre-line text-center mb-2 text-lg font-medium">
                วิดีโอเบื้องต้น
              </h1>
              <div class="w-auto p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                <span class="whitespace-pre-line text-center mb-2 text-sm font-base tracking-tight text-gray-900 dark:text-white">
                  {firstVideo && (
                    <ReactPlayer
                      url={firstVideo}
                      controls={true}
                      width="100%"
                      height="100%"
                    />
                  )}
                </span>
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      ) : (
        <Tabs aria-label="Default tabs" className="w-full justify-center">
          <Tabs.Item title="รายละเอียด" icon={MdDashboard}>
            <ul
              class="grid lg:grid-cols-2  text-base font-base text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              style={{ justifyContent: "center" }}
            >
              <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center">
                <svg
                  class="w-8 h-8 inline-block mr-2 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z" />
                </svg>
                <span className="font-medium">วิชา: </span>
                {data.subject}
              </li>
              <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center">
                <svg
                  class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="font-medium">ผู้สอน: </span>
                {data.instructor_name}
              </li>
              <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center">
                <svg
                  class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="font-medium">รูปแบบ: </span>
                {data.study_type === "Online" ? "ออนไลน์" : "สดออนไลน์"}
              </li>
              <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center">
                <svg
                  class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
                    clip-rule="evenodd"
                  />
                </svg>
                {/* {data.videos.data[0].attributes.duration} ชั่วโมง */}
                <span className="font-medium">
                  {data.study_type === "Online" ? "ระยะเวลา" : "ช่วงเวลา"}:
                </span>
                {data.study_type === "Online"
                  ? `${totalDurations}`
                  : `${data.schedule_text}`}
              </li>
              <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex items-center">
                <svg
                  class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  {data.study_type === "Online"
                    ? "ยอดสั่งซื้อ: "
                    : "นักเรียน: "}
                </span>
                {data.amount}
                {data.maxamount ? `/${data.maxamount}` : ""} คน
              </li>
            </ul>
          </Tabs.Item>
          <Tabs.Item title="บทเรียน" icon={HiAdjustments}>
            <h1 className="whitespace-pre-line text-center mb-2 text-lg font-medium">
              บทเรียนทั้งหมดในคอร์สนี้ ประกอบด้วย
            </h1>
            <div class="w-auto p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
              <span class="whitespace-pre-line text-center mb-2 text-sm font-base tracking-tight text-gray-900 dark:text-white">
                {data.detail}
              </span>
            </div>
          </Tabs.Item>
          <Tabs.Item title="วิดีโอ" icon={MdVideocam}>
            <h1 className="whitespace-pre-line text-center mb-2 text-lg font-medium">
              วิดีโอเบื้องต้น
            </h1>
            <div class="w-auto p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
              {firstVideo ? (
                <ReactPlayer
                  url={firstVideo}
                  controls={true}
                  width="100%"
                  height="100%"
                />
              ) : (
                <p class="whitespace-pre-line text-center mb-2 text-sm font-base tracking-tight text-gray-900 dark:text-white">
                  ไม่มีวิดีโอ
                </p>
              )}
            </div>
          </Tabs.Item>
        </Tabs>
      )}
    </>
  );
}
