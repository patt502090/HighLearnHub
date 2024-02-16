import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Course from "../components/HomePage/Course";
import Announcements from "../components/HomePage/Announcement";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import OnlineBestSeller from "../components/HomePage/OnlineBestSeller";
import OnlineLatest from "../components/HomePage/OnlineLatest";
import LiveCourse from "../components/HomePage/LiveCourse";

export default function HomePage() {
  const [course, setCourse] = useState([]);
  const [announcements, setAnnouncements] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(
          "http://localhost:1337/api/courses?populate=image"
        );

        const announcementResponse = await axios.get(
          "http://localhost:1337/api/announcements?populate=image"
        );

        const courseData = courseResponse.data.data.map((item) => ({
          id: item.id,
          title: item.attributes.title,
          price: item.attributes.price,
          image: "http://localhost:1337" + item.attributes.image.data.attributes.url,
        }));

        const announcementData = announcementResponse.data.data.map((item) => ({
          id: item.id,
          title: item.attributes.title,
          image: "http://localhost:1337" + item.attributes.image.data.attributes.url,
        }));

        setCourse(courseData);
        setAnnouncements(announcementData);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Announcements data={announcements} />
      <OnlineBestSeller/>
      <OnlineLatest/>
      <LiveCourse/>
      <Course data={course} />
      <Outlet />
    </>
  );
}
