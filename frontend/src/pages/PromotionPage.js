import React, { useState } from "react";
import backgroundImage from "../assets/background.png";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import conf from "../conf/main";
import ax from "../conf/ax";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ContextProvider } from "../context/Auth.context";
import { Button } from "flowbite-react";




export default function PromotiPage() {
    const {id} = useParams();
    const [promotion, setPromotion] = useState([]);
    const [checkcoursedata,setCheckcoursedata]=useState();
    console.log("id = ",id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
            `/announcements/${id}?populate=*`)
        console.log("gay is real :",response);

        setPromotion(response.data);




        //เดะผมค่อยมาแก้ตรงนี้ต่อนอนล้ะ 5555 ค้างไว้ก่อน 
        //กับการที่จะโพสสร้างตะกร้าแพ็คเกจ
        //และอีกเยอะเลย t-t
        
  
        
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  const Addcart = async (course) => {
    try {
      //ตรงนี้ต้องแก้ให้เช็คว่ามีข้อมูลในตะกร้าอยู่แล้วไหมก่อนที่จะโพส ถ้าไม่มีก็เพิ่มปกติ ถ้ามีก็ให้โพสคอร์สอื่นๆในแพ็คโดยที่ไม่เพิ่มตัวมัน
      console.log("value = ",course)
      // const bookedDate = new Date(); // สร้างวันที่และเวลาปัจจุบัน

      // // แยกระหว่างวันที่และเวลา
      // const date = bookedDate.toISOString().split("T")[0]; // แยกวันที่ (อันดับแรกของ ISO string)
      // const time = bookedDate.toISOString().split("T")[1].split(".")[0]; // แยกเวลา (อันดับสองของ ISO string)

      // // สร้างวันหมดอายุโดยเพิ่ม 3 วันลงไปจาก booked_date
      // const expiryDate = new Date(bookedDate);
      // expiryDate.setDate(expiryDate.getDate() + 3);
      // const expiryDateString = expiryDate.toISOString().split("T")[0]; // แยกวันที่ออกมา

      // const response = await ax.post(conf.apiUrlPrefix + `/createBooking`, {
      //   data: {
      //     booked_date: `${date} ${time}`,
      //     expiry_date: `${expiryDateString} ${time}`, // ใช้วันที่หมดอายุที่ถูกปรับแล้ว
      //     course: parseInt(id),
      //     publishedAt: new Date(),
      //   },
      // });
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };
  
  return (
    <ContextProvider>
    
      <div className="background-image">
        <Navbar />
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>รายละเอียดคอร์ส</title>
        </Helmet>
        <div className="max-w-4xl mx-auto p-6 pt-24 text-center">
          {promotion.data ? (
            <div className="bg-white shadow-md rounded-md p-6">
              {promotion.data.attributes.image && (
                <img
                  src={`${conf.urlPrefix}${promotion.data.attributes.image.data.attributes.url}`}
                  alt={promotion.data.attributes.title}
                  className="w-full h-auto mb-6 rounded-md"
                />
              )}
              <h1 className="mb-4 text-2xl font-bold">
                {promotion.data.attributes.title}
              </h1>
  

              <p className="text-md sm:text-lg font-normal sm:font-medium mb-4">
                {promotion.data.attributes?.Describtion}
              </p>

              {/* <p className="text-md text-center font-bold text-red-700 sm:text-2xl mb-4">
                ราคา: {course.attributes.price} บาท
              </p> */}
              <div className=" items-center">
                {/* <div>{ownCourseDisplay}</div> */}
                <Link to={"/MyCart"}>
                < Button onClick={()=>Addcart(promotion.data.attributes.courses)}>
                กดสั่งซื้อ
                </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="h-screen flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </ContextProvider>
    
  );
}
