import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import conf from '../conf/main';
import ax from '../conf/ax';
import { Button, Modal } from 'flowbite-react';

export default function CourseControlPanelPage() {
    const [data, setData] = useState();
    const [course, setCourse] = useState();
    const { ownerId } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const fetchData = async () => {
        try {
            const response = await ax.get(`${conf.apiUrlPrefix}/users/${ownerId}?populate[bookings][filters][payment_status][$eq]=true&populate[bookings][populate]=course&populate=image`);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const listCourse = async () => {
        try {
            const findCourse = await ax.get(`${conf.apiUrlPrefix}/courses`)
            console.log(findCourse);
            setCourse(findCourse.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const removeDuplicateCourse = () => {
        if (course && data) {
            const dataTitles = data.bookings.map(item => item.course.title);
            setCourse(course.filter(word => !dataTitles.includes(word.attributes.title)));
        }
    }

    const addCourse = async (id) => {
        try {
            const addCourse = await ax.post(`${conf.apiUrlPrefix}/bookings?populate`, {
                data: {
                    "booked_date": new Date(),
                    "payment_status": true,
                    "publishedAt": new Date(),
                    "status": "success",
                    "user": ownerId,
                    "course": id
                }
            })
            fetchData();
            removeDuplicateCourse();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await ax.delete(`${conf.apiUrlPrefix}/bookings/${id}`)
            fetchData();
            removeDuplicateCourse();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
        listCourse();
    }, []);

    useEffect(() => {
        removeDuplicateCourse();
    }, [course])

    return (
        <>
            <Helmet>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>ระบบจัดการคอร์ส</title>
            </Helmet>
            <div className='background-image'>
                <div className='h-full'>
                    <Navbar />
                    <div className="">
                        <div className="mx-auto pt-[90px] sm:w-full">
                            <div className="photo-wrapper p-2 mb-2 flex flex-row items-center justify-center mx-auto"> {/* Wrap the image and name in a container */}
                                {(data?.image) ?
                                    <img className="inline outline outline-gray-500 object-cover w-32 h-32 rounded-full" src={`${conf.urlPrefix}${data?.image.url}`} alt="" />
                                    :
                                    <svg class="w-32 h-32 rounded-full text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z" clip-rule="evenodd" />
                                    </svg>
                                }
                                <p className='inline text-3xl mt-3 ml-3 font-bold'>ระบบจัดการคอร์ส<br />{data?.first_name} {data?.last_name}</p>
                            </div>
                            <div className="mb-3 mx-auto items-top w-[90%] xl:w-2/3 2xl:w-6/6 p-10 sm:p-20 2xl:p-16 bg-white md:shadow-lg rounded-3xl lg:rounded-full">
                                <div className='flex flex-wrap'>
                                    <div class="w-full bg-slate-200 p-6 rounded-3xl shadow-lg mx-auto items-center">
                                        <div className='text-center text-xl font-bold mb-3'>{(data?.bookings?.length >= 1) ? "คอร์สในบัญชี" : "ไม่มีคอร์สในบัญชี"}</div>
                                        {data?.bookings?.map((item) => (
                                            <div className='relative group py-2 text-black text-sm lg:text-base font-medium transition-all duration-400 ease-in-out transform hover:scale-105 hover:text-slate-200 hover:shadow-lg active:scale-90'>
                                                <li className="grid grid-cols-2 overflow-hidden max-w-full whitespace-nowrap">
                                                    <span>{item.course.title}</span>
                                                    <span className='flex justify-end items-center'>
                                                        <svg className="w-6 h-6 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </li>
                                                <button onClick={() => setOpenModal([true, item.id, item.course.title])} className="text-start w-full p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                                    ลบคอร์สนี้
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto items-top h-full w-[90%] xl:w-2/3 2xl:w-6/6 p-10 sm:p-20 2xl:p-16 bg-white md:shadow-lg rounded-3xl lg:rounded-full">
                                <div class=" bg-slate-200 p-6 h-[288px] overflow-y-scroll rounded-3xl shadow-lg mx-auto items-center">
                                    <div className='text-center text-xl font-bold mb-3'>เพิ่มคอร์สในบัญชี</div>
                                    {course?.map((item) => (
                                        <div className='relative group py-2 text-black text-sm lg:text-base font-medium transition-all duration-400 ease-in-out transform hover:scale-105 hover:text-slate-200 hover:shadow-lg active:scale-90'>
                                            <li className="grid grid-cols-2 overflow-hidden max-w-full whitespace-nowrap">
                                                <span>{item.attributes.title}</span>
                                                <span className='flex justify-end items-center'>
                                                    <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z" clip-rule="evenodd" />
                                                    </svg>
                                                </span>
                                            </li>
                                            <button onClick={() => setAddModal([true, item.id, item.attributes.title])} className="text-start w-full p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                                เพิ่มคอร์ส
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Modal show={openModal[0]} size="lg" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <svg class="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        <span>ยืนยันจะลบ </span><span className='font-bold text-black'>{openModal[2]}</span><span> ออกจากบัญชีนี้?</span>
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="failure" onClick={() => [setOpenModal(false), handleDelete(openModal[1])]}>
                                            {"ยืนยัน"}
                                        </Button>
                                        <Button color="gray" onClick={() => setOpenModal(false)}>
                                            ยกเลิก
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <Modal show={addModal[0]} size="lg" onClose={() => setAddModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <svg class="mx-auto mb-4 h-14 w-14 text-blue-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z" clip-rule="evenodd" />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        <span>ยืนยันจะเพิ่ม </span><span className='font-bold text-black'>{addModal[2]}</span><span> ในบัญชีนี้?</span>
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="blue" onClick={() => [setAddModal(false), addCourse(addModal[1])]}>
                                            {"ยืนยัน"}
                                        </Button>
                                        <Button color="gray" onClick={() => setAddModal(false)}>
                                            ยกเลิก
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>

                </div>
            </div>
        </>
    )
}
