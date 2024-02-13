import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseInfoPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/courses/1`);
                setCourse(response.data); 
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse(); 
    }, [id]);

    return (
        <div className='flex flex-col items-center mt-6'>
            <h className='text-xl font-bold'>CourseInfo Page</h>
            {course ? (
                <div>
                    <p>Course ID: {course.id}</p>
                    <p>Course Name: {course.name}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
