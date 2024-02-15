import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseInfoPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [learningType, setLearningType] = useState("live"); // Default to "live" learning type

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
    }, [id]);

    return (
        <div className='flex flex-col items-center mt-6'>
            <h1 className='text-xl font-bold'>Course Info Page</h1>
            {course ? (
                <div>
                    <p>Course ID: {course.id}</p>
                    <p>Course Name: {course.attributes.title}</p>
                    {course.attributes.image && ( 
                        <img 
                            src={`http://localhost:1337${course.attributes.image.data.attributes.url}`} 
                            alt={course.attributes.title} 
                            style={{ maxWidth: "100%", height: "auto" }} 
                        />
                    )}
                    <p className="text-red-700">Price: {course.attributes.price}</p>
                    <p>บทเรียน</p>
                    <div className="mt-4">
                        <button 
                            className={`mr-4 px-4 py-2 ${learningType === 'live' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
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
                    <p className="mt-4">{learningType === 'live' ? 'Live Lesson Details' : 'Online Lesson Details'}</p>
                    <p className="text-gray-700 mt-2">{learningType === 'live' ? course.attributes.liveLessonDetails : course.attributes.onlineLessonDetails}</p>
                    <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Order Now
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
