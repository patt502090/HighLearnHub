import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import React, { useState, useEffect } from "react";
import ax from "../../conf/ax";
import conf from "../../conf/main";

export default function ManageVideoModal({ data, onCloseModal, openModal }) {
  const [editedVideo, setEditedVideo] = useState({
    attributes: {
      title: "",
      description: "",
      url: "",
      duration: "",
    },
  });
  console.log(data);

  useEffect(() => {
    if (data && data.attributes) {
      setEditedVideo({
        attributes: {
          title: data.attributes.title,
          description: data.attributes.description,
          url: data.attributes.url,
          duration: formatDurationToString(data.attributes.duration),
        },
      });
    }
  }, [data]);
  console.log("T1", editedVideo.attributes);
  console.log("T2", editedVideo);

  const handleUpdateVideo = async () => {
    try {
      const response = await ax.put(`${conf.apiUrlPrefix}/videos/${data.id}`, {
        data: {
          title: editedVideo.attributes.title,
          description: editedVideo.attributes.description,
          duration: formatDurationToSeconds(editedVideo.attributes.duration),
          url: editedVideo.attributes.url,
        },
      });
      console.log("Update วิดีโอสำเร็จ", response?.data);
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const handleChanged = (e) => {
    setEditedVideo((prevState) => ({
      ...prevState,
      attributes: { ...prevState.attributes, ...e },
    }));
  };

  const formatDurationToSeconds = (duration) => {
    const [hours, minutes, seconds] = duration.split(":");
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  };

  const handleSubmit = () => {
    const formattedDuration = formatDurationToSeconds(
      editedVideo.attributes.duration
    );
    const editedVideoFormatted = {
      ...editedVideo,
      attributes: {
        ...editedVideo.attributes,
        duration: formattedDuration,
      },
    };

    handleUpdateVideo(data.id, editedVideoFormatted);
    onCloseModal(false);
  };

  const handleCancel = () => {
    onCloseModal(false);
  };

  const formatDurationToString = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Modal
      show={openModal}
      size="2xl"
      position="center"
      onClose={() => onCloseModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
            แก้ไขข้อมูลบทเรียน
          </h3>
          <div className="flex items-center">
            <div className="w-24 text-center">
              <Label htmlFor="videoTitle" value="ชื่อบทเรียน : " />
            </div>
            <div className="flex-grow">
              <TextInput
                id="videoTitle"
                placeholder="ชื่อวิดีโอ"
                value={editedVideo.attributes.title}
                onChange={(event) =>
                  handleChanged({ title: event.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-center">
              <Label htmlFor="videoDescription" value="คำอธิบาย : " />
            </div>
            <div className="flex-grow">
              <Textarea
                id="videoDescription"
                value={editedVideo.attributes.description}
                onChange={(event) =>
                  handleChanged({ description: event.target.value })
                }
                placeholder="คำอธิบาย"
                required
                rows={4}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-center">
              <Label htmlFor="videoUrl" value="ลิงก์ URL : " />
            </div>
            <div className="flex-grow">
              <TextInput
                id="videoUrl"
                value={editedVideo.attributes.url}
                placeholder="https://www.youtube.com/watch?v=video_id"
                onChange={(event) => handleChanged({ url: event.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-center">
              <Label htmlFor="videoDuration" value="ระยะเวลา : " />
            </div>
            <div className="flex-grow">
              <TextInput
                id="videoDuration"
                value={editedVideo.attributes.duration}
                placeholder="ชั่วโมง:นาที:วินาที"
                onChange={(event) =>
                  handleChanged({ duration: event.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex justify-center space-x-3">
            <Button onClick={handleSubmit} gradientDuoTone="purpleToBlue">
              ยืนยัน
            </Button>
            <Button onClick={handleCancel} gradientDuoTone="pinkToOrange">
              ยกเลิก
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
