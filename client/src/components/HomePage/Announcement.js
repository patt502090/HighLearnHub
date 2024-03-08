import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination ,Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SwiperButton.css";
import { Modal } from 'flowbite-react';


export default function Announcements({ data , showmodal }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  console.log("comanndata:",selectedAnnouncement)
  const handleImageClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenModal(true);
  };
  
  return (
    <div>
      <div className="relative z-0 mx-auto px-5 h-full w-full spacing-under-header">
        <Swiper
          spaceBetween={30}
          modules={[Navigation, Pagination ,Autoplay]}
          navigation={true}
          loop={true}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
          }}
          initialSlide={0}
          >
          {data?.map((announcement) => (
            <SwiperSlide key={announcement.id}>
              
                <img
                  className="mx-auto border rounded-3xl shadow hover:scale-105 transition duration-500 cursor-pointer"
                  src={announcement.image}
                  alt={announcement.title}
                  onClick={() => handleImageClick(announcement)}
                />
            </SwiperSlide>
                  ))}
        </Swiper>
            {openModal && selectedAnnouncement && (
        <Modal show={()=>setOpenModal(true)} onClose={() => setOpenModal(false)}>
          <Modal.Header>{selectedAnnouncement.title}</Modal.Header>
              
              <Modal.Body >
              <img
              className="mx-auto border rounded-3xl shadow hover:scale-105 transition duration-500 cursor-pointer"
              src={selectedAnnouncement.image}
              alt={selectedAnnouncement.title}
              />
             <br/>
              <p>
              {selectedAnnouncement.describtion}
             </p>
             <br/>
              ประกอบด้วย  
             <p>
              
             {selectedAnnouncement.courses.data.map((item, index) => (
      <React.Fragment key={index}>
        <span>{item.attributes.title}</span>
        <br />
             
      </React.Fragment>
    ))}
              </p>
              <p>
                <span>หมดอายุวันที่:</span> {selectedAnnouncement.expiry_date}
              </p>           
                 </Modal.Body>
        </Modal>)}
      

                
      </div>
    </div>
  );
}
