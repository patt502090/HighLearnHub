import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";
import Course from "../components/Course";
import { Toaster } from 'react-hot-toast';
import axios from "axios";


export default function HomePage() {
    const [course, setCourse] = useState();
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/courses?populate=image`);
                console.log(response)
                const datas = response.data.data.map((item) => ({
                    id: item.id,
                    title: item.attributes.title,
                    price: item.attributes.price,
                    image: 'http://localhost:1337'+item.attributes.image.data.attributes.url

                }))
                setCourse(datas);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse();
    }, []);
    return (
        <>
            <Navbar />
            <Toaster position="top-right" reverseOrder={false} />
            <Course data={course} />
            <Outlet />
        </>
    )
}