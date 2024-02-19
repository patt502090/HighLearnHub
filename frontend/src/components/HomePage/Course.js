import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Dropdown, DropdownItem } from "flowbite-react";
import { HiClock } from "react-icons/hi";
export default function Course(props) {
  const [filterType, setFilterType] = useState("All");
  const [dropdownLabel, setDropdownLabel] = useState("ทั้งหมด");

  const handleFilter = (type, label) => {
    setFilterType(type);
    setDropdownLabel(label);
  };

  return (
    <>
      <div className="w-4/5 mx-auto h-full flex flex-wrap items-center justify-between mt-20">
        <p className="font-medium text-3xl">คอร์สเรียนทั้งหมด</p>
        <div className="flex my-10 ml-2">
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

        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-2">
          {props.data?.map((item) => (
            <div
              key={item.id}
              className={`hover:translate-y-[-10px] transition-transform duration-300 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 m-2 ${
                filterType === "All" || item.type === filterType
                  ? "block"
                  : "hidden"
              }`}
            >
              <Link to={`/course/${item.id}`}>
                <img
                  className="rounded-t-lg w-full h-24 lg:h-40 object-cover"
                  src={item.image}
                  alt=""
                />
                <div className="p-4 flex flex-col justify-between">
                  <p
                    className={`text-${
                      item.type === "Live" ? "red-500" : "yellow-300"
                    } text-xs mb-2`}
                  >
                    {item.type === "Live" ? "LIVE COURSE" : "ONLINE COURSE"}
                  </p>
                  <h5 className="mb-2 text-base lg:text-lg font-medium tracking-tight text-gray-900 dark:text-white text-left">
                    {item.title}
                  </h5>
                  <p className="font-light text-sm text-gray-500 overflow-hidden h-20 mt-1">
                    {item.description}
                  </p>
                  {item.type === "Live" ? (
                    <p className="my-5 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                      จำนวนผู้ลงสมัคร{" "}
                      <a class="hover:underline decoration-red-500/30">
                        {item.amount}/{item.maxamount}
                      </a>{" "}
                      คน
                    </p>
                  ) : (
                    <p className="my-5 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-red-500">
                      จำนวนยอดสั่งซื้อ{" "}
                      <a class="hover:underline decoration-red-500/30 ">
                        {item.amount}
                      </a>{" "}
                      คอร์ส
                    </p>
                  )}
                  <div className="flex my-3 ">
                    {item.type === "Live" ? (
                      <Badge color="failure">LIVE</Badge>
                    ) : (
                      <Badge color="warning">ONLINE</Badge>
                    )}
                  </div>
                  <hr className="mt-1" />
                  {item.type === "Online" ? (
                    <div className="flex flex-wrap gap-2 justify-between">
                      <Badge color="gray" icon={HiClock} className="mt-2">
                        {item.duration.hours} ชั่วโมง {item.duration.minutes}{" "}
                        นาที
                      </Badge>
                      <p className="text-right mt-3 font-semibold">
                        {item.price} บาท{" "}
                      </p>
                    </div>
                  ) : (
                    <p className="text-right mr-1 mt-3 font-semibold">
                      {item.price} บาท{" "}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
}
