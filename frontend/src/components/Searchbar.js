import React, { useState } from "react";
import { Modal, ModalHeader } from "flowbite-react";

function Searchbar(props) {
    const [showSubjectFilterModal, setShowSubjectFilterModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [showingItem, setShowingItem] = useState('')
    const data = props.data.map((e) => ({
        ...e,
        title: e.title.toLowerCase(),
        common_name: e.title
    }));

    const handleShowing = (e) => {
        console.log(data);
        if (!e) {
            setShowingItem(null)
        }
        else {
            const item = data
                .filter(value => value.title.includes(e))
                .map((value) => (
                    <li>
                        <a href={`/course/${value.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{value.common_name}</a>
                    </li>
                ));

            setShowingItem(item);
            console.log(showingItem);
        }
    }

    const handleSearchInput = (e) => {
        const data = e.toLowerCase();
        handleShowing(data)
    }

    return (
        <>
            <body className="bg-gray-300">
                <div className="container mx-auto flex justify-center items-center h-30 p-4 relative">
                    <button
                        type="button"
                        className="flex text-black border-none justify-center font-medium rounded-full text-sm px-5 py-2.5 text-center"
                        onClick={() => setShowSubjectFilterModal(true)}
                    >
                        <svg
                            className="w-6 h-6 text-black dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            onClick={() => setShowSubjectFilterModal(false)}
                        >
                            <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
                        </svg>
                        ตัวกรอง
                    </button>
                    <form className="flex items-center justify-center relative">
                        <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>

                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="w-64 p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Courses"
                                required
                                onChange={(e) => handleSearchInput(e.target.value)}
                            />
                            <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 absolute top-full left-0 dark:bg-gray-700">
                                {(showingItem) ? <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">{showingItem}</ul> : <></>}
                            </div>
                        </div>
                    </form>
                </div>
            </body>

            <Modal
                show={showSubjectFilterModal}
                size="md"
                onClose={() => setShowSubjectFilterModal(false)}
                popup
            >
                <ModalHeader>Filter</ModalHeader>
                <Modal.Body>
                    <div className="text-center">
                        {" "}
                        กรองตามวิชา
                        <div>
                            <label
                                className="inline-flex items-center mt-3"
                                style={{ display: "block" }}
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">
                                    ฟิสิกส์
                                </span>
                            </label>
                            <label
                                className="inline-flex items-center mt-3"
                                style={{ display: "block" }}
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">
                                    คอม
                                </span>
                            </label>
                        </div>
                        <div>
                            กรองตามราคา
                            <div>
                                <label
                                    className="inline-flex items-center mt-3"
                                    style={{ display: "block" }}
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                                        0-1000
                                    </span>
                                </label>
                                <label
                                    className="inline-flex items-center mt-3"
                                    style={{ display: "block" }}
                                >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                                        1000-2000
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                className={`bg-red-500 text-white px-4 py-2 rounded-lg mt-3 ml-auto`}
                            >
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Searchbar