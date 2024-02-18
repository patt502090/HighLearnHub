import React, { useState, useEffect } from "react";
import { useParams ,Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CartPage from "./CartPage";

export default function CourseInfoPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [learningType, setLearningType] = useState("live");
    const [amount, setAmount] = useState(0); // เพิ่ม state สำหรับจำนวน amount และเริ่มต้นเป็น 0

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/courses/${id}?populate=image`);
                setCourse(response.data.data);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse();
        console.log(fetchCourse);
    }, [id]);

    // สร้างฟังก์ชัน handleOrderClick เพื่อเพิ่มจำนวน amount เมื่อกดสั่งคอร์ส
    const handleOrderClick = () => {
        setAmount(prevAmount => prevAmount + 1);
        
    };

    return (
        <div className="min-h-screen bg-gray-200">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-8">Course Info Page</h1>
                {course ? (
                    <div className="bg-white shadow-md rounded-md p-6">
                        <p className="text-gray-600 mb-4">Course ID: {course.id}</p>
                        <p className="text-gray-600 mb-4">Course Name: {course.attributes.title}</p>
                        {course.attributes.image && (
                            <img
                                src={`http://localhost:1337${course.attributes.image.data.attributes.url}`}
                                alt={course.attributes.title}
                                className="w-full h-auto mb-4 rounded-md"
                            />
                        )}
                        <p className="text-red-700 mb-4">Price: {course.attributes.price}</p>
                        <p className="text-red-700 mb-4">จำนวนที่นั่ง: {amount}/{course.attributes.amount}</p>
                        <p className="text-gray-600 mb-4">บทเรียน</p>
                        <div className="space-x-4 mb-4">
                            <button
                                className={`px-4 py-2 ${learningType === 'live' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
                                onClick={() => setLearningType('live')}
                            >
                                Live
                            </button>
                            <button
                                className={`px-4 py-2 ${learningType === 'online' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
                                onClick={() => setLearningType('online')}
                            >
                                Online
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">{learningType === 'live' ? 'Live Lesson Details' : 'Online Lesson Details'}</p>
                        <p className="text-gray-800 mb-4">{learningType === 'live' ? course.attributes.livedetail : course.attributes.onlinedetail}</p>
        
                        <Link to={'/payment'}>
                        <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={handleOrderClick}>
                            Order Now
                        </button></Link>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
