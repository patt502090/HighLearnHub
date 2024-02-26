import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import ax from "../conf/ax";
import Navbar from "../components/Navbar";
import conf from "../conf/main";
import { Progress } from "flowbite-react";
import { ContextProvider } from "../context/Auth.context";
import Footer from "../components/VideoPage/Footer";
import Modal from "../components/VideoPage/Modal";
import { Helmet } from "react-helmet";

function VideoPage() {
  const { id } = useParams();
  const [played, setPlayed] = useState(0);
  const [title, setTitle] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchTimeId, setWatchTimeId] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [durationSelected, setDurationSelected] = useState(0);
  const [imageCourse, setImageCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(played)

  const handleLeaveRoom = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().finally(() => {
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!isLoading && selectedVideo) {
      updateWatchTime();
    }
  }, [played, userID, isLoading]);

  useEffect(() => {
    fetchTotalWatchData().finally(() => {
      setIsLoading(false);
    });
  }, [id, played]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageResponse = await ax.get(
          `${conf.apiUrlPrefix}/courses?populate=image&filters[id][$eq]=${id}`
        );
        console.log("imageResponse", imageResponse);
        const imageData = imageResponse.data.data.map((course) => ({
          id: course.id,
          image:
            `${conf.urlPrefix}` + course.attributes.image.data.attributes.url,
        }));

        setImageCourse(imageData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const userDataResponse = await ax.get(
        `${conf.apiUrlPrefix}/users/me?populate[bookings][populate][course][populate]=videos&populate[bookings][filters][course][id][$eq]=${id}`
      );
      const userData = userDataResponse.data;
      const bookingData = userData.bookings;

      const firstCourse = bookingData[0]?.course;
      if (firstCourse) {
        setTitle(firstCourse.title);
      }

      const filteredBookings = bookingData.filter(
        (booking) => booking.payment_status === true
      );
      const allVideos = filteredBookings.flatMap(
        (booking) => booking.course.videos
      );
      setVideoData(allVideos);
      console.log("AllVideo", allVideos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  const updateWatchTime = async () => {
    try {
      console.log("watchID", watchTimeId);
      if (watchTimeId) {
        await ax.put(`${conf.apiUrlPrefix}/watch-times/${watchTimeId}`, {
          data: { watch_time: played },
        });
        console.log("อัปเดต watch time สำเร็จ.");
      } else {
        const response = await ax.post(`${conf.apiUrlPrefix}/watch-times`, {
          data: {
            video: { connect: [{ id: selectedVideo.id }] },
            watch_time: 0,
            course: { connect: [{ id: id }] },
            member: { connect: [{ id: userID }] },
          },
        });
        console.log("สร้าง watch time สำเร็จ. ID:", response?.data?.data?.id);
        setWatchTimeId(response?.data?.data?.id);
      }
    } catch (error) {
      console.error("Error posting watch time: ", error);
    }
  };

  const handleVideoSelection = async (videoId) => {
    if (!isLoading) {
      setIsLoading(true);
      const selected = videoData.find((video) => video.id === videoId);
      console.log("Selected", selected);
      if (selected) {
        setSelectedVideo(selected);
        setDurationSelected(selected.duration);
        if (userID) {
          console.log("UserID", userID);
          const watchTimeResponse = await ax.post(
            `${conf.apiUrlPrefix}/mycourse`, {
              data : {
                id : id
              }
            }
          );
          console.log("WatchTimeResponse", watchTimeResponse);
          if (watchTimeResponse?.data?.data?.length > 0) {
            setCurrentTime(
              Math.round(
                watchTimeResponse?.data?.data[0]?.attributes?.watch_time
              )
            );
            console.log(
              "Watch Current Time Current",
              Math.round(
                watchTimeResponse?.data.data[0]?.attributes?.watch_time
              )
            );
            console.log("Watch Time ID", watchTimeResponse?.data?.data[0]?.id);
            setWatchTimeId(watchTimeResponse?.data?.data[0]?.id);
          } else {
            setWatchTimeId(null);
            setCurrentTime(null);
            console.log("ไม่มีข้อมูลเวลาในการรับชม");
          }
        }
      }
      setIsLoading(false);
    }
  };

  const totalDuration = videoData.reduce(
    (total, item) => total + item.duration,
    0
  );

  console.log("totalWatchTime", totalWatchTime);
  console.log("totalDuration", totalDuration);
  const calculateProgress = () => {
    if (totalDuration === 0) return 0;
    const progress = (totalWatchTime / totalDuration) * 100;
    return Math.min(Math.round(progress), 100);
  };

  const calculateProgressSelected = () => {
    if (durationSelected === 0) return 0;
    const progressSelected = (played / durationSelected) * 100;
    return Math.round(progressSelected);
  };

  const fetchTotalWatchData = async () => {
    try {
      const userStartResponse = await ax.get(`${conf.apiUrlPrefix}/users/me`);
      const userStartData = userStartResponse.data.id;
      setUserID(userStartData);
      const watchTimesResponse = await ax.post(
        `${conf.apiUrlPrefix}/mycourse`, {
          data : {
            id : id
          }
        }
      );
      console.log("watchTimesResponse", watchTimesResponse);
      const watchTimesData = watchTimesResponse.data.data;
      console.log("watchTimesData", watchTimesData);
      let totalWatchTime = 0;
      watchTimesData.forEach((watchTime) => {
        totalWatchTime += watchTime.attributes.watch_time;
      });
      setTotalWatchTime(totalWatchTime);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const CurrentTime = `&t=${currentTime}s`;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let formattedTime = "";

    if (hours > 0) {
      formattedTime += `${hours} hr `;
    }

    if (minutes > 0) {
      formattedTime += `${minutes} m `;
    }

    if (remainingSeconds > 0 || formattedTime === "") {
      formattedTime += `${remainingSeconds} s`;
    }

    return formattedTime.trim();
  };
  // console.log("image", imageCourse[0]);

  return (
    <ContextProvider>
      <>
        <Navbar />
        <div className="py-16">
          <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>วิดิโอสำหรับเรียน</title>
          </Helmet>
          {isLoading && (
            <div className="fixed left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          )}
          <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <div className="w-full sm:w-2/5 2xl:w-3/12 p-4">
              <h2 className="text-center md:text-left text-sm md:text-lg font-medium mt-10 sm:ml-2">
                {title}
              </h2>
              <div className="w-9/12 md:w-full mx-auto md:mx-0 mt-2">
                <Progress
                  progress={calculateProgress()}
                  size="sm"
                  color="yellow"
                />
              </div>
              <h3 className="mt-2 text-center md:text-left text-xs md:text-sm text-slate-500 sm:ml-2">{`${calculateProgress()}% Complete`}</h3>
              <hr className="my-3" />
              <ul className="overflow-y-hidden">
                {videoData.map((video) => (
                  <li
                    key={video.id}
                    onClick={() => handleVideoSelection(video.id)}
                    className={`flex items-center cursor-pointer ${
                      video.id === selectedVideo?.id
                        ? "my-2 bg-gray-200 p-4 rounded"
                        : "ml-4 my-4"
                    }`}
                  >
                    <span className="flex-grow text-sm md:text-base overflow-hidden">
                      {video.title}
                    </span>
                    {video.id === selectedVideo?.id &&
                      calculateProgressSelected() >= 100 && (
                        <span className="mr-3 text-green-500">Complete</span>
                      )}
                    <span className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                      {formatTime(video.duration)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-grow p-4 md:p-10">
              {selectedVideo && (
                <>
                  <h2 className="text-md md:text-lg font-medium text-center mb-3 md:mb-7 ">
                    {selectedVideo.title}
                  </h2>
                  <ReactPlayer
                    key={selectedVideo.id}
                    onProgress={(progress) => {
                      setPlayed(progress.playedSeconds);
                    }}
                    controls={true}
                    url={`${selectedVideo.url}${CurrentTime}`}
                    height="75%"
                    width="100%"
                  
                  />
                  <p className="mt-7 text-sm md:text-lg text-center text-slate-500">
                    {selectedVideo.description}
                  </p>
                </>
              )}
              {!selectedVideo && (
                <>
                  {imageCourse && imageCourse.length > 0 && (
                    <img
                      src={imageCourse[0]?.image}
                      alt="Course Image"
                      className="mx-auto sm:h-4/5 2xl:h-5/6 rounded-lg shadow-lg "
                    />
                  )}
                </>
              )}
            </div>
            <Footer onLeaveRoom={handleLeaveRoom} />
            <Modal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </>
    </ContextProvider>
  );
}
export default VideoPage;
