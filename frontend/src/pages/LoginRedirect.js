import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



const backendUrl = "http://localhost:1337";

const LoginRedirect = () => {
  const [text, setText] = useState("กำลังโหลด...");
  const location = useLocation();
  const navigate = useNavigate();  

  useEffect(() => {
    const providerName = "google"; 

    fetch(`${backendUrl}/api/auth/${providerName}/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`ไม่สามารถเข้าสู่ระบบ Strapi ได้ สถานะ: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {

        sessionStorage.setItem("auth.jwt", res.jwt);
    
        setText(
          "คุณเข้าสู่ระบบสำเร็จแล้ว คุณจะถูกเปลี่ยนเส้นทางภายในไม่กี่วินาที..."
        );

        setTimeout(() => navigate("/home"), );  
      })
      .catch((err) => {
        console.log(err);
        setText("เกิดข้อผิดพลาด โปรดดูคอนโซลนักพัฒนาซอฟต์แวร์");
      });
  }, [navigate, location.search]); 

  return <p>{text}</p>;
};

export default LoginRedirect;
