import React from "react";

export default function Course() {
    return (
        <>
            <div>
                <h2> 105 รายการ</h2>
            </div>
            <hr className="border-t-4 border-black border-solid my-1" style={{ borderColor: '#000000' }} />
            <h1 className="text-3xl font-bold text-center mb-8" style={{ borderColor: '#000000',marginTop: '40px'  }}>คอร์สเรียนที่แนะนำ</h1>
            <div style={{ margin: '60px' }}></div>
            <div className="flex flex-wrap justify-center">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-64 object-cover" src="https://study.com/cimages/course-image/biology-101-syllabus-resource-lesson-plans_139158_large.jpg" alt="" />
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
                        <img className="rounded-t-lg w-full h-64 object-cover" src="https://miro.medium.com/v2/resize:fit:1400/1*L76A5gL6176UbMgn7q4Ybg.jpeg" alt="" />
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
                        <img className="rounded-t-lg w-full h-64 object-cover" src="https://www.chula.ac.th/wp-content/uploads/2018/03/cu_inside_14112016.jpg" alt="" />
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
            
            <hr className="border-t-4 border-black border-solid my-1" style={{ borderColor: '#000000',marginTop: '70px'  }} />
            <h1 className="text-3xl font-bold text-center mb-8" style={{ borderColor: '#000000',marginTop: '40px'  }}>คอร์สเรียนที่น่าสนใจ</h1>
            <div style={{ margin: '60px' }}></div>
            <div className="flex flex-wrap justify-center">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
                    <a href="#">
                        <img className="rounded-t-lg w-full h-64 object-cover" src="https://study.com/cimages/course-image/biology-101-syllabus-resource-lesson-plans_139158_large.jpg" alt="" />
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
                        <img className="rounded-t-lg w-full h-64 object-cover" src="https://miro.medium.com/v2/resize:fit:1400/1*L76A5gL6176UbMgn7q4Ybg.jpeg" alt="" />
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
                        <img className="rounded-t-lg w-full h-64 object-cover" src="https://www.chula.ac.th/wp-content/uploads/2018/03/cu_inside_14112016.jpg" alt="" />
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
