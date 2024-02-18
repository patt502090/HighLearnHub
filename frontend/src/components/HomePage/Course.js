import React from "react";
import { Link } from "react-router-dom";

export default function Course(props) {
  console.log(props);
  return (
    <>
      <div className="w-4/5 mx-auto h-full">
        <p className="font-medium mx-auto mt-20 text-3xl">คอร์สเรียนทั้งหมด</p>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 mt-7">
          {props.data?.map((item) => (
            <div className="hover:translate-y-[-10px] transition-transform duration-300 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
              <Link to={`/course/${item.id}`}>
                <img
                  className="rounded-t-lg w-full h-24 lg:h-40 object-cover"
                  src={item.image}
                  alt=""
                />
                <div className="p-4 flex flex-col justify-between">
                {props.type === "Live" ? <p className="text-blue-500 text-xs mb-2">LIVE COURSE</p> : <p className="text-yellow-300 text-xs mb-2">ONLINE COURSE</p>}
                  <h5 className="mb-2 text-base lg:text-lg font-medium tracking-tight text-gray-900 dark:text-white text-left">
                    {item.title}
                  </h5>
                  <p className="mb-1 text-xs lg:text-sm font-light h-min text-gray-500 dark:text-gray-400 text-left">
                    <span>{item.description.slice(0, 75)}</span>
                    <span className=" font-medium text-blue-400">......Click for more detail</span>
                  </p>
                  <hr className="mt-6" />
                  <p className="text-right mr-1 mt-3 font-semibold">
                    {item.price} บาท{" "}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
