import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import conf from "../conf/main";
import ax from "../conf/ax";
import { Button } from "flowbite-react";
import ManageVideoModal from "../components/ManageViedoPage/ModalEditVideo";

const ManageVideoPage = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await ax.get(
          `${conf.apiUrlPrefix}/videos?populate=course&filters[course][id][$eq]=${id}`
        );
        setVideos(response?.data?.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [editModalOpen]);

  const handleEdit = (videoId) => {
    console.log("Edit video with id:", videoId);
    setSelectedVideoId(videoId);
    setEditModalOpen(true);
  };

  const handleDelete = (videoId) => {
    console.log("Delete video with id:", videoId);
  };

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 0 ? hours + " ชั่วโมง " : "";
    const formattedMinutes = minutes > 0 ? minutes + " นาที " : "";
    const formattedSeconds = seconds > 0 ? seconds + " วินาที" : "";

    return formattedHours + formattedMinutes + formattedSeconds;
  };

  return (
    
    <div>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-2xl underline font-medium text-center text-black-600 mb-8 tracking-wide">
          จัดการวิดีโอและแก้ไขบทเรียน
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300"
                >
                  ชื่อบทเรียน
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300"
                >
                  คำอธิบาย
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300"
                >
                  วิดีโอตัวอย่าง
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 whitespace-nowrap"
                >
                  ระยะเวลา
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  แก้ไข/ลบ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map((video) => (
                <tr key={video.id}>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                    <div className="text-sm font-medium text-gray-900">
                      {video.attributes.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                    <div
                      className="text-sm text-gray-900"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {video.attributes.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                    <ReactPlayer
                      url={video.attributes.url}
                      width="100%"
                      height="auto"
                      controls
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                    <span className="text-sm font-base text-gray-700">
                      {formatDuration(video.attributes.duration)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300 flex justify-center items-center">
                    <Button
                      gradientDuoTone="purpleToBlue"
                      onClick={() => handleEdit(video.id)}
                      className="mr-2 mb-2"
                    >
                      แก้ไข
                    </Button>
                    <Button
                      gradientDuoTone="pinkToOrange"
                      onClick={() => handleDelete(video.id)}
                      className="mb-2"
                    >
                      ลบ
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedVideoId && (
        <ManageVideoModal
          openModal={editModalOpen}
          onCloseModal={setEditModalOpen}
          data={videos.find((video) => video.id === selectedVideoId)}
        />
      )}
    </div>
  );
};

export default ManageVideoPage;
