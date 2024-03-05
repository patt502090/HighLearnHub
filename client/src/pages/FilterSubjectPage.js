import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ax from '../conf/ax';
import conf from '../conf/main';
import Navbar from '../components/Navbar';

function FilterSubjectPage() {
    const { id } = useParams();
    const [courseData, setCourseData] = useState();
    console.log("🚀 ~ FilterSubjectPage ~ courseData:", courseData)
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState();
    console.log("🚀 ~ FilterSubjectPage ~ subject:", subject)
    useEffect(() => {
        switch (id) {
            case "math":
                setSubject("คณิตศาสตร์");
                break;
            case "science":
                setSubject("วิทยาศาสตร์");
                break;
            case "thai":
                setSubject("ภาษาไทย");
                break;
            case "eng":
                setSubject("ภาษาอังกฤษ");
                break;
            case "socialstudy":
                setSubject("สังคมศึกษา");
                break;
            default:
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [subject])

    const fetchData = async () => {
        setLoading(true);
        console.log('asdad', subject);
        if (subject) {
            const req = await ax.get(`${conf.apiUrlPrefix}/courses?filters[subject][$eq]=${subject}&populate=image`)
            setCourseData(req.data.data);
        }
        setLoading(false);
    }


    return (
        <div className="background-image">
            <Navbar />
            <div className={
                courseData?.length > 2
                    ? "h-full"
                    : "h-screen"
            }>
                <div className="mx-10 lg:mx-auto flex flex-col items-center justify-items-center w-auto pt-[90px] sm:w-full">
                    <div className="h-auto w-full xl:w-2/3 2xl:w-3/5 p-10 sm:p-20 2xl:p-16 bg-white shadow-lg rounded-full ">
                        <p className="text-2xl font-medium text-center mb-3 md:mb-8">
                            คอร์สวิชา{subject}
                        </p>
                        {loading ? (
                            <p className="text-center">กำลังโหลด...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {courseData?.map((course) => (
                                    <Link
                                        to={`/course/${course.id}`}
                                        key={course.id}
                                    >
                                        <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:translate-y-[-2px] transition-transform duration-300 ">
                                            <div className="h-30 overflow-hidden">
                                                <img
                                                    src={conf.urlPrefix + course.attributes.image.data.attributes.url}
                                                    alt={course.attributes.title}
                                                    className="object-cover w-full h-30 md:h-36 mb-3 hover:opacity-50 rounded-t-lg"
                                                />
                                            </div>
                                            <h2 className="text-sm md:text-lg font-semibold my-3 ">
                                                {course.attributes.title}
                                            </h2>
                                            <p className="text-xs md:text-sm text-slate-500 mb-4 md:mb-2 overflow-hidden h-15 md:h-20 font-light">
                                                {course.attributes.description}
                                            </p>
                                            <div className="mt-auto">
                                                <hr></hr>
                                                <div className="text-xs md:text-sm font-base text-black mb-1">
                                                    <p className="text-right mt-3 font-bold text-lg">
                                                        {course.attributes.price} บาท{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSubjectPage