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
    const [Userid,setUserId]=useState();
    console.log("id = ",id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
            `/announcements/${id}?populate=*`)
        console.log("gay is real :",response);

        setPromotion(response.data);
        const user = await ax.get(conf.apiUrlPrefix+"/users/me")
        setUserId(user.data.id)
        



        //เดะผมค่อยมาแก้ตรงนี้ต่อนอนล้ะ 5555 ค้างไว้ก่อน 
        //กับการที่จะโพสสร้างตะกร้าแพ็คเกจ
        //และอีกเยอะเลย t-t
        
  
        
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  
  
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
