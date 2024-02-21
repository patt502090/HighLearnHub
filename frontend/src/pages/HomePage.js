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
import Searchbar from "../components/Searchbar";
import CircularProgress from '@mui/material/CircularProgress';

export default function HomePage() {
  const [course, setCourse] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const courseResponse = await axios.get(
          "http://localhost:1337/api/courses?populate=image&populate=videos"
        );

        const announcementResponse = await axios.get(
          "http://localhost:1337/api/announcements?populate=image"
        );

        const courseData = courseResponse?.data?.data?.map(
          (course) => {
            const totalDurationMinutes = course.attributes.videos.data.reduce(
              (totalDuration, video) =>
                totalDuration + video.attributes.duration,
              0
            );

            const hours = Math.floor(totalDurationMinutes / 60);
            const minutes = totalDurationMinutes % 60;

            return {
              id: course.id,
              title: course.attributes.title,
              price: course.attributes.price,
              amount: course.attributes.amount,
              maxamount: course.attributes.maxamount,
              description: course.attributes.description,
              image:
                "http://localhost:1337" +
                course.attributes.image.data.attributes.url,
              type: course.attributes.study_type,
              duration: { hours, minutes },
            };
          }
        );

        const announcementData = announcementResponse.data.data.map((item) => ({
          id: item.id,
          title: item.attributes.title,
          image:
            "http://localhost:1337" + item.attributes.image.data.attributes.url,
        }));

        setCourse(courseData);
        setAnnouncements(announcementData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {(loading) ? <div className="h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
        : <><Navbar />
          <Searchbar data={course} />
          <Announcements data={announcements} />
          <OnlineBestSeller />
          <OnlineLatest />
          <LiveCourse />
          <Course data={course} />
          <Outlet /></>}
    </>
  );
}
