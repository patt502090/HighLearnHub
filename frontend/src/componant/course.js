import React from "react";

export default function Course() {
    return (
        <>
            <div className="flex justify-between container mx-auto px-5 mt-3">
                <h2 className="mt-2"> 105 รายการ</h2>
                <div className="order-last">
                    <button type="button" className="flex text-black justify-items-end bg-neutral-400 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        <svg class="w-5 h-5 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
                </svg>
                    เรียงตามราคา</button></div>
            </div>
            <hr className="border-t-4 border-black border-solid my-1" style={{ borderColor: '#000000' }} />
            <h1 className="text-3xl font-bold text-center mb-5" style={{ borderColor: '#000000', marginTop: '40px' }}>คอร์สเรียนที่แนะนำ</h1>
            <div className="grid grid-cols-3 gap-2 justify-center justify-items-center">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://study.com/cimages/course-image/biology-101-syllabus-resource-lesson-plans_139158_large.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">ชีววิทยา</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3 text-red-500" >3900</h2>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://miro.medium.com/v2/resize:fit:1400/1*L76A5gL6176UbMgn7q4Ybg.jpeg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">คณิตศาสตร์</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3 text-red-500">4900</h2>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://www.chula.ac.th/wp-content/uploads/2018/03/cu_inside_14112016.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">ฟิสิกส์</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3">3599</h2>
                    </div>
                </div>
                <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://www.chula.ac.th/wp-content/uploads/2018/03/cu_inside_14112016.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">ฟิสิกส์</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3">3599</h2>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://www.chula.ac.th/wp-content/uploads/2018/03/cu_inside_14112016.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">ฟิสิกส์</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3">3599</h2>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://www.chula.ac.th/wp-content/uploads/2018/03/cu_inside_14112016.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">ฟิสิกส์</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3 text-red-500">3599</h2>
                    </div>
                </div>
            </div>

            <hr className="border-t-4 border-black border-solid my-1" style={{ borderColor: '#000000', marginTop: '70px' }} />
            <h1 className="text-3xl font-bold text-center mb-8" style={{ borderColor: '#000000', marginTop: '40px' }}>คอร์สเรียนที่น่าสนใจ</h1>
            <div style={{ margin: '60px' }}></div>
            <div className="grid grid-cols-3 gap-2 justify-center justify-items-center">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://study.com/cimages/course-image/biology-101-syllabus-resource-lesson-plans_139158_large.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">ชีววิทยา</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3 text-red-500">3900</h2>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://miro.medium.com/v2/resize:fit:1400/1*L76A5gL6176UbMgn7q4Ybg.jpeg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">คณิตศาสตร์</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3 text-red-500">4900</h2>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-32 lg:h-64 object-cover" src="https://www.chula.ac.th/wp-content/uploads/2018/03/cu_inside_14112016.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">ฟิสิกส์</h5>
                        </a>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-center">pack สรุป ม.1-ม.3</p>
                        <hr className="border-t border-black border-solid my-1" />
                        <h2 className="text-center mb-3 text-red-500">3599</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
