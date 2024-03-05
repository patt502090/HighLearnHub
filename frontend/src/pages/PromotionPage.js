import React, { useState, useEffect, useContext } from "react";
import { AuthContext, ContextProvider } from "../context/Auth.context";
import { Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Course from "../components/PromotionPage/Course";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import ax from "../conf/ax";
import conf from "../conf/main";
import Help from "../components/Helper";
import PromotionSort from "../components/PromotionPage/PromotionSort";
import PromotionSection from "../components/PromotionPage/LandingOnPromotion";
import backgroundImage from "../assets/background.png";
export default function HomePage() {
  const [course, setCourse] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state: ContextState } = useContext(AuthContext);
  const { userRole } = ContextState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const courseResponse = await ax.get(
          `${conf.apiUrlPrefix}/courses?populate=image&populate=videos&filters[discount][$nei]=1`
        );

        // console.log("courseResponse",courseResponse)
        const courseData = courseResponse?.data?.data?.map((course) => {
          const totalDurationSeconds = course.attributes.videos.data.reduce(
            (totalDuration, video) => totalDuration + video.attributes.duration,
            0
          );
          console.log("Course", course);

          const minutes = Math.floor(totalDurationSeconds / 60);
          const seconds = Math.floor(totalDurationSeconds % 60);

          return {
            id: course.id,
            title: course.attributes.title,
            price: course.attributes.price,
            amount: course.attributes.amount,
            maxamount: course.attributes.maxamount,
            discount: course.attributes.discount,
            description: course.attributes.description,
            image:
              `${conf.urlPrefix}` + course.attributes.image.data.attributes.url,
            type: course?.attributes?.study_type,
            duration: { minutes, seconds },
            date: course.attributes.schedule_text,
          };
        });
        // console.log("กรองข้อมูลแล้ว",courseData)
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
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
          <title>Promotion</title>
        </Helmet>
        {loading ? (
          <div className="h-screen flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="scroll-smooth focus:scroll-auto">
              <PromotionSection/>
              <Navbar data={course} />
              <div className="py-20">
                <PromotionSort/>
                <Course data={course} />
              </div>
              <Footer></Footer>
              <Outlet />
              <Help />
            </div>
          </>
        )}
      </ContextProvider>
    </>
  );
}
