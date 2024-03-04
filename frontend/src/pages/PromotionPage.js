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
    const [discount,setDiscount] = useState();
    console.log("id = ",id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
            `/announcements/${id}?populate=*`)
        console.log("gay is real :",response);

        setPromotion(response.data);
        setDiscount(response.data.data.attributes.discount);       
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  const lastprice = (course) =>{
      console.log("ต่อยกัน",course)
      console.log("ส่วนลด",discount)
      let totalPricediscount = 0;
      let totalPrice = 0;
      course.data.forEach((item) => {
        const discount = item.attributes.price * (10/100); // หาค่าส่วนลด 10%
        const discountedPrice = item.attributes.price - discount; // หาราคาหลังลด
        totalPricediscount += discountedPrice;
        totalPrice += item.attributes.price

      });
      console.log("price : ",totalPrice,totalPricediscount)
    
      return {totalPrice: totalPrice,totalPricediscount:totalPricediscount
      };
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
          <title>รายละเอียดประกาศ</title>
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
               <p className="text-left">
                ประกอบด้วยคอร์สดังนี้
                {promotion.data.attributes.courses.data?.map(course =>(
                  <ul class="text-left indent-8">
                  <li>{course.attributes.title}</li>
                  
                  </ul>
                  
                  ))
                }
                </p>
            <p className="text-right">
              
                <span className="text-3xl  font-bold text-red-600 ">ลด {promotion.data.attributes.discount}%!!!</span>
                
            </p>
            
            
          
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
