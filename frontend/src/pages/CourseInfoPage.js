import React, { useState, useEffect,useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import BasicTabs from "../components/Tabs";
import CircularProgress from '@mui/material/CircularProgress';
import EditCourseModal from "./EditCourseModal";


export default function CourseInfoPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const { state: ContextState } = useContext(AuthContext);
    const { userRole } = ContextState;
    const [onEdit, setOnEdit] = useState(false);

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

    if (userRole === "admin") {
        return (
            <div className="background-image">
                {(onEdit) ? <EditCourseModal openModal={onEdit} onCloseModal={setOnEdit}/> : <></>}
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
                            <p className="text-center text-2xl font-bold text-red-700 mb-4">ราคา: {course.attributes.price} บาท </p>
                                <button onClick={() => setOnEdit(true)} className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                    แก้ไขข้อมูล
                                </button>
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
                        <p className="text-center text-2xl font-bold text-red-700 mb-4">ราคา: {course.attributes.price} บาท </p>
                        <Link to={'/mycart'}>
                            <button className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
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
