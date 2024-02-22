import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import ax from "../conf/ax";
import Navbar from "../components/Navbar";
import conf from "../conf/main";
import { Progress } from "flowbite-react";

function VideoPage() {
  const { id } = useParams();
  const [played, setPlayed] = useState(0);
  const [title, setTitle] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchTimeId, setWatchTimeId] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime,setCurrentTime] = useState(0)

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!isLoading && selectedVideo) {
      updateWatchTime();
    }
  }, [selectedVideo, played, userID, isLoading]); 

  const fetchData = async () => {
    try {
      const userDataResponse = await ax.get(`${conf.apiUrlPrefix}/users/me?populate[bookings][populate][course][populate]=videos`);
      const userData = userDataResponse.data;
      const bookingData = userData.bookings;
      const currentUserID = userData.id;

      if (currentUserID) {
        setUserID(currentUserID);
      }

      const firstCourse = bookingData[0]?.course;
      if (firstCourse) {
        setTitle(firstCourse.title);
      }

      const filteredBookings = bookingData.filter(booking => booking.payment_status === true);
      const allVideos = filteredBookings.flatMap(booking => booking.course.videos);
      setVideoData(allVideos);
      console.log("AllVideo",allVideos)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const updateWatchTime = async () => {
    try {
      console.log("watchID",watchTimeId)
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
            member: { connect: [{ id: userID }] },
          },
        });
        console.log("สร้าง watch time สำเร็จ.");
        setWatchTimeId(response?.data?.id);
      }
    } catch (error) {
      console.error("Error posting watch time: ", error);
    }
  };

  const handleVideoSelection = async (videoId) => {
    if (!isLoading) {
      setIsLoading(true);
      const selected = videoData.find(video => video.id === videoId);
      console.log(selected);
      if (selected) {
        setSelectedVideo(selected);
        if (userID) {
          console.log("UserID",userID)
          const watchTimeResponse = await ax.get(`${conf.apiUrlPrefix}/watch-times?populate=*&filters[member][id][$eq]=${userID}&filters[video][id][$eq]=${selected.id}`);
          console.log("WatchTimeResponse",watchTimeResponse);
          setCurrentTime(Math.round(watchTimeResponse?.data.data[0].attributes.watch_time));
          console.log("Watch Current Time Current",Math.round(watchTimeResponse?.data.data[0].attributes.watch_time))
          console.log("Watch Time ID",watchTimeResponse?.data?.data[0]?.id)
          if (watchTimeResponse?.data?.data?.length > 0) {
            setWatchTimeId(watchTimeResponse?.data?.data[0]?.id);
          } else {
            setWatchTimeId(null);
          }
        }
      }
      setIsLoading(false);
    }
  };
  

  const calculateProgress = () => {
    if (selectedVideo) {
      const progress = (played / selectedVideo.duration) * 100;
      return Math.round(progress);
    }
    return 0;
  };

  const CurrentTime = `&t=${currentTime}s`

  return (
    <>
      <Navbar />
      <div className="flex w-1/4 md:w-full ">
        <div className="flex-none w-1/5 p-4">
          <h2 className="text-left ml-3 text-lg font-medium mt-10">{title}</h2>
          <div className="w-3/4 ml-3 mt-2">
            <Progress progress={calculateProgress()} size="sm" color="yellow" />
          </div>
          <h3 className="ml-3 mt-2 text-xs text-slate-500">{`${calculateProgress()}% Complete`}</h3>
          <hr className="my-3" />
          <ul>
            {videoData.map(video => (
              <li
                key={video.id}
                onClick={() => handleVideoSelection(video.id)}
                className={`cursor-pointer hover:text-blue-600 ${video.id === selectedVideo?.id ? "font-bold ml-3" : "ml-3"
                  }`}
              >
                {video.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-grow p-10">
          {selectedVideo && (
            <ReactPlayer
              key={selectedVideo.id}
              onProgress={(progress) => {
                setPlayed(progress.playedSeconds);
              }}
              controls={true}
              url={`${selectedVideo.url}${CurrentTime}`}
              height="700px"
              width="1200px"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default VideoPage;
