import React, { useState } from "react";

export default function CourseInfoPage() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
    };

    return (
        <div>
            <button
                id="sidebar-toggle"
                className="fixed top-0 left-0 z-50 p-4 bg-gray-200 rounded-lg"
                onClick={toggleSidebar}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {sidebarVisible && (
                <>
                    <div
                        id="sidebar"
                        className="fixed top-0 left-0 bg-white w-64 h-full shadow-md overflow-auto z-40"
                    >
                        <div className="p-4">
                            <h2 className="text-xl font-bold">Sidebar</h2>
                            <ul className="mt-4">
                                <li className="mb-2">
                                    <a href="#" className="text-gray-700 hover:text-gray-900">
                                        Home
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-700 hover:text-gray-900">
                                        About
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-gray-700 hover:text-gray-900">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        id="overlay"
                        className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-30"
                        onClick={closeSidebar}
                    ></div>
                </>
            )}
        </div>
    );
}
