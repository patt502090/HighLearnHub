import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Dropdown, DropdownItem } from "flowbite-react";
import { HiClock } from "react-icons/hi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import ax from "../../conf/ax";
import { FaCalendarDays } from "react-icons/fa6";

export default function Course(props) {
  const [filterType, setFilterType] = useState("All");
  const [dropdownLabel, setDropdownLabel] = useState("ทั้งหมด");
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(savedLikes);
  }, []);

  const handleFilter = (type, label) => {
    setFilterType(type);
    setDropdownLabel(label);
  };

  const handleLike = async (courseId) => {
    try {
      const response = await ax.put(`/courses/${courseId}/like`);
      if (response.data.ok === 1) {
        setLikes((prevLikes) => {
          const updatedLikes = { ...prevLikes };
          if (prevLikes[courseId]) {
            delete updatedLikes[courseId];
          } else {
            updatedLikes[courseId] = true;
          }
          localStorage.setItem("likes", JSON.stringify(updatedLikes));
          return updatedLikes;
        });
      } else {
        console.error("Failed to update like");
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <>
      <div className="w-full md:w-5/6 2xl:w-4/5 mx-auto h-full flex flex-wrap items-center justify-between">
        <p className="font-medium text-2xl md:text-3xl pl-3 md:pl-0">
          คอร์สเรียนทั้งหมด
        </p>
        <div className="flex my-10 mr-3 md:mr-0">
          <Dropdown label={dropdownLabel} className="mr-2">
            <DropdownItem
              onClick={() => handleFilter("All", "ทั้งหมด")}
              active={filterType === "All"}
              className="flex-1"
            >
              ทั้งหมด
            </DropdownItem>
            <DropdownItem
              onClick={() => handleFilter("Online", "ออนไลน์")}
              active={filterType === "Online"}
              className="flex-1"
            >
              ออนไลน์
            </DropdownItem>
            <DropdownItem
              onClick={() => handleFilter("Live", "สด")}
              active={filterType === "Live"}
              className="flex-1"
            >
              สด
            </DropdownItem>
          </Dropdown>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-4 gap-2 md:gap-6 mr-2 md:mx-0">
          {props.data?.map((item) => (
            <div
              key={item.id}
              className={`hover:translate-y-[-10px] transition-transform duration-300 w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 m-1 md:m-2 ${
                filterType === "All" || item.type === filterType
                  ? "block"
                  : "hidden"
              }`}
            >
              <Link to={`/course/${item.id}`}>
                <img
                  className="rounded-t-lg w-full h-30 md:h-40 object-cover"
                  src={item.image}
                  alt=""
                />
                <div className="p-3 md:p-4 flex flex-col justify-between">
                  <p
                    className={`text-${
                      item.type === "Live" ? "red-500" : "yellow-300"
                    } text-xs mb-1`}
                  >
                    {item.type === "Live" ? "LIVE COURSE" : "ONLINE COURSE"}
                  </p>
                  <div className="h-[30px] md:h-[120px]">
                    <p className="text-sm md:text-base font-medium max-w-md">
                      {item.title}
                    </p>
                    {window.innerWidth > 900 && (
                      <p className="font-light text-sm text-gray-500 overflow-hidden h-20 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.type === "Live" ? (
                    <p className="my-5 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-xs md:text-base">
                      จำนวนผู้ลงสมัคร{" "}
                      <span className="hover:underline decoration-red-500/30">
                        {item.amount}/{item.maxamount}
                      </span>{" "}
                      คน
                    </p>
                  ) : (
                    <p className="my-5 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-red-500 text-xs md:text-base">
                      {window.innerWidth < 900
                        ? "ยอดสั่งซื้อ"
                        : "จำนวนยอดสั่งซื้อ"}{" "}
                      <span className="hover:underline decoration-red-500/30 ">
                        {item.amount}
                      </span>{" "}
                      คอร์ส
                    </p>
                  )}
                  <div className="flex my-1 md:my-3">
                    {item.type === "Live" ? (
                      <Badge color="failure">LIVE</Badge>
                    ) : (
                      <Badge color="warning">ONLINE</Badge>
                    )}
                  </div>
                  <hr className="mt-1" />

                  {item.type === "Online" ? (
                    <div className="md:flex md:flex-wrap gap-2 md:justify-between ">
                      <Badge
                        color="gray"
                        icon={HiClock}
                        className="mt-2 text-[10px] md:text-xs mx-3 md:mx-0 font-normal"
                      >
                        {item.duration.minutes >= 60 && (
                          <>
                            {Math.floor(item.duration.minutes / 60)} ชั่วโมง{" "}
                            {item.duration.minutes % 60 > 0 &&
                              `${item.duration.minutes % 60} นาที`}{" "}
                            {item.duration.seconds} วินาที
                          </>
                        )}
                        {item.duration.minutes < 60 && (
                          <>
                            {item.duration.minutes} นาที {item.duration.seconds}{" "}
                            วินาที
                          </>
                        )}
                      </Badge>

                      <p className="mt-2 font-normal md:font-semibold text-center md:text-right text-[13px] md:text-base">
                        {item.price} บาท{" "}
                      </p>
                    </div>
                  ) : (
                    <div className="md:flex md:flex-wrap gap-2 md:justify-between ">
                      <Badge
                        color="gray"
                        icon={FaCalendarDays}
                        className="mt-2 text-[10px] md:text-xs mx-3 md:mx-0 font-normal item"
                      >
                        {item?.date ? (
                          <>
                            {item?.date && (
                              <span className="items-center">{item.date}</span>
                            )}
                          </>
                        ) : (
                          "ไม่ระบุวันที่"
                        )}
                      </Badge>

                      <p className="mt-2 font-normal md:font-semibold text-center md:text-right text-[13px] md:text-base">
                        {item.price} บาท{" "}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="bottom-0 p-3">
                <button
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                  onClick={() => handleLike(item.id)}
                >
                  {likes[item.id] ? (
                    <AiFillLike className="w-4 h-4 text-blue-500" />
                  ) : (
                    <AiOutlineLike className="w-4 h-4" />
                  )}
                  <span>{likes[item.id] || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
