import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import React, { useState } from "react";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import toast, { Toaster } from 'react-hot-toast';
export default function ModalCreateVideo({ onCloseModal, openModal, idCourse }) {
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    url: "",
    duration: "",
  });
  const handleCreateVideo = async () => {
    try {
      const response = await ax.post(`${conf.apiUrlPrefix}/videos`, {
        data: {
        title: newVideo.title,
        description: newVideo.description,
        duration: formatDurationToSeconds(newVideo.duration),
        course: { connect: [{ id: idCourse }] },
        url: newVideo.url,
    }});
      console.log("ข้อมูลใหม่",newVideo)
      console.log("วิดีโอถูกสร้างเรียบร้อยแล้ว", response?.data);
      toast.success('สร้างวิดีโอสำเร็จ');
      resetForm();
      onCloseModal(false);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างวิดีโอ:", error);
    }
  };

  const handleCancel = () => {
    onCloseModal(false);
  };

  const formatDurationToSeconds = (duration) => {
    const [hours, minutes, seconds] = duration.split(":");
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  };

  const resetForm = () => {
    setNewVideo({
      attributes: {
        title: "",
        description: "",
        url: "",
        duration: "",
      },
    });
  };

  return (
    <Modal
      show={openModal}
      size="2xl"
      position="center"
      onClose={() => onCloseModal(false)}
      popup
    >
      <Modal.Body>
        <div className="space-y-6 pt-8">
          <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
            สร้างบทเรียนใหม่
          </h3>
          <div className="flex items-center">
            <div className="w-24 text-center">
              <Label htmlFor="newVideoTitle" value="ชื่อบทเรียน : " />
            </div>
            <div className="flex-grow">
              <TextInput
                id="newVideoTitle"
                placeholder="ชื่อวิดีโอ"
                value={newVideo.title}
                onChange={(event) => setNewVideo({ ...newVideo, title: event.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-center">
              <Label htmlFor="newVideoDescription" value="คำอธิบาย : " />
            </div>
            <div className="flex-grow">
              <Textarea
                id="newVideoDescription"
                value={newVideo.description}
                onChange={(event) => setNewVideo({ ...newVideo, description: event.target.value })}
                placeholder="คำอธิบาย"
                required
                rows={4}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-center">
              <Label htmlFor="newVideoUrl" value="ลิงก์ URL : " />
            </div>
            <div className="flex-grow">
              <TextInput
                id="newVideoUrl"
                value={newVideo.url}
                placeholder="https://www.youtube.com/watch?v=video_id"
                onChange={(event) => setNewVideo({ ...newVideo, url: event.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-24 text-center">
              <Label htmlFor="newVideoDuration" value="ระยะเวลา : " />
            </div>
            <div className="flex-grow">
              <TextInput
                id="newVideoDuration"
                value={newVideo.duration}
                placeholder="ชั่วโมง:นาที:วินาที"
                onChange={(event) => setNewVideo({ ...newVideo, duration: event.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-center space-x-3">
            <Button onClick={handleCreateVideo} gradientDuoTone="purpleToBlue">
              สร้าง
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
