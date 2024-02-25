import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import conf from "../conf/main";
import ax from "../conf/ax";
import { Button } from "flowbite-react";
import ManageVideoModal from "../components/ManageViedoPage/ModalEditVideo";
import ModalDelete from "../components/ManageViedoPage/ModalDeleteVideo";
import ModalCreateVideo from "../components/ManageViedoPage/ModalCreateVideo";
import { AiTwotoneFileAdd } from "react-icons/ai";

import IconButton from "@mui/material/IconButton";

const ManageVideoPage = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await ax.get(
          `${conf.apiUrlPrefix}/videos?populate=course&filters[course][id][$eq]=${id}&sort[0]=id`
        );
        setVideos(response?.data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [editModalOpen, deleteModalOpen, isCreateModalOpen]);

  const handleEdit = (videoId) => {
    console.log("Edit video with id:", videoId);
    setSelectedVideoId(videoId);
    setEditModalOpen(true);
  };

  const handleDeleteModalOpen = (videoId, videoTitle) => {
    console.log(videoId, videoTitle);
    setSelectedVideoId(videoId);
    setSelectedVideoTitle(videoTitle);
    setDeleteModalOpen(true);
  };

  const handleDeleteVideo = async () => {
    try {
      await ax.delete(`${conf.apiUrlPrefix}/videos/${selectedVideoId}`);
      setDeleteModalOpen(false);
      setSelectedVideoId(null);
      setSelectedVideoTitle(null);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
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
      <div className="container pt-24 mx-auto ">
        <h1 className="text-2xl underline font-medium text-center text-black-600 mb-8 ">
          จัดการวิดีโอและแก้ไขบทเรียน
        </h1>
        <div
          className="fixed bottom-0 right-0 lg:mb-10 lg:mr-14"
          style={{ zIndex: 999 }}
        >
          <IconButton
            color="primary"
            style={{ fontSize: "50px" }}
            onClick={() => setCreateModalOpen(true)}
          >
            <AiTwotoneFileAdd />
          </IconButton>
        </div>

        {loading ? (
          <div className="text-center">กำลังโหลด...</div>
        ) : (
          <div className="overflow-x-auto">
            {videos.length > 0 ? (
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
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300"
                    >
                      วิดีโอตัวอย่าง
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300 whitespace-nowrap"
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
                          onClick={() =>
                            handleDeleteModalOpen(
                              video.id,
                              video.attributes.title
                            )
                          }
                          className="mb-2"
                        >
                          ลบ
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center mt-4">ไม่มีข้อมูล</div>
            )}
          </div>
        )}
      </div>
      {selectedVideoId && (
        <ManageVideoModal
          openModal={editModalOpen}
          onCloseModal={setEditModalOpen}
          data={videos.find((video) => video.id === selectedVideoId)}
        />
      )}
      <ModalDelete
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteVideo}
        videoTitle={selectedVideoTitle}
      />
      <ModalCreateVideo onCloseModal={setCreateModalOpen} openModal={isCreateModalOpen} idCourse={id} />
    </div>
  );
};

export default ManageVideoPage;
