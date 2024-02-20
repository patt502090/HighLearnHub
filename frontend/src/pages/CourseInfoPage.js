import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CartPage from "./CartPage";
import BasicTabs from "../components/Tabs";
import CircularProgress from '@mui/material/CircularProgress';


export default function CourseInfoPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [amount, setAmount] = useState(0); // เพิ่ม state สำหรับจำนวน amount และเริ่มต้นเป็น 0

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/courses/${id}?populate=*`);
                setCourse(response.data.data);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse();
    }, [id]);

    // สร้างฟังก์ชัน handleOrderClick เพื่อเพิ่มจำนวน amount เมื่อกดสั่งคอร์ส
    const handleOrderClick = () => {
        setAmount(prevAmount => prevAmount + 1);

    };

    return (
        <div className="background-image">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 text-center">
                {course ? (
                    <div className="bg-white shadow-md rounded-md p-6">
                        {course.attributes.image && (
                            <img
                                src={`http://localhost:1337${course.attributes.image.data.attributes.url}`}
                                alt={course.attributes.title}
                                className="w-full h-auto mb-6 rounded-md"
                            />
                        )}
                        <h1 className="mb-4 text-2xl font-bold">{course.attributes.title}</h1>

                        <BasicTabs data={course} />
                        {/* <span className="whitespace-pre-line">{course.attributes.detail}</span><br /> */}
                        <p className="text-lg font-medium mb-4">{course.attributes.description}</p>
                        <span className="text-left text-xl font-medium text-red-700 mb-4">ราคา: {course.attributes.price} บาท </span>
                        <Link to={'/payment'}>
                            <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={handleOrderClick}>
                                เพิ่มเข้าตะกร้า
                            </button></Link>
                    </div>
                ) : (
                    <div className="h-screen flex justify-center items-center">
                        <CircularProgress />
                    </div>
                )}
            </div>
        </div>
    );
}
