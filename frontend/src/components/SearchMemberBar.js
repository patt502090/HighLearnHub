import React, { useState } from "react";

function SearchMemberBar(props) {
    const [showSubjectFilterModal, setShowSubjectFilterModal] = useState(false);
    const [showingItem, setShowingItem] = useState("");
    console.log(props.data);
    const data = props.data.map((e) => ({
        ...e,
        username: e.username.toLowerCase(),
        common_name: e.username,
    }));

    const handleShowing = (e) => {
        console.log(data);
        if (!e) {
            setShowingItem(null);
        } else {
            const item = data
                .filter((value) => value.username.includes(e))
                .map((value) => (
                    <li>
                        <a onClick={() => {props.setProfileId(value.id);props.setOpenModal(true);}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            {value.common_name}
                        </a>
                    </li>
                ));

            setShowingItem(item);
            console.log(showingItem);
        }
    };

    const handleSearchInput = (e) => {
        const data = e.toLowerCase();
        handleShowing(data);
    };

    return (
        <>
            <div className="container mx-auto flex justify-center items-center">
                <form className="flex items-center justify-center relative">
                    <label
                        htmlFor="default-search"
                        className="text-sm font-medium text-gray-900 sr-only dark:text-white"
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
                            className="w-40 lg:w-72 p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Profiles"
                            required
                            onChange={(e) => handleSearchInput(e.target.value)}
                            onClick={() => setShowSubjectFilterModal(false)}
                        />
                        <div
                            id="dropdown"
                            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 absolute top-full left-0 dark:bg-gray-700"
                        >
                            {showingItem ? (
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownDefaultButton"
                                >
                                    {showingItem}
                                </ul>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}

export default SearchMemberBar;
