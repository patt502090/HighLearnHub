import React from 'react';

function ProfilePage() {
    return (
        <div className="bg-gray-100 p-4">

            <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">

                <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full">
                    <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
                        <img src="https://media.licdn.com/dms/image/C4D03AQH8qidO0nb_Ng/profile-displayphoto-shrink_800_800/0/1615696897070?e=2147483647&v=beta&t=ia3wfE2J7kVLdBy9ttkgUDAA_ul29fymykhQo0lABDo" alt="Profile" />
                    </div>

                    <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
                        <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
                            Amit Pachange
                        </p>
                        <p className="text-heading">Software Engineer</p>
                    </div>

                </div>

                <div className="p-5">

                    <div className="flex flex-col sm:flex-row sm:mt-10">

                        <div className="flex flex-col sm:w-1/3">
                            <div className="py-3 sm:order-none order-3">
                                <h2 className="text-lg font-poppins font-bold text-top-color">My Contact</h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>

                                <div>
                                    <div className="flex items-center my-1">
                                        <a className="w-6 text-gray-700 hover:text-orange-600" href="mailto:amitpachange@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-4">
                                            <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                                        </svg></a>
                                        <div className="ml-2 truncate">amitpachange@gmail.com</div>
                                    </div>
                                    <div className="flex items-center my-1">
                                        <a className="w-6 text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href="" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-4">
                                            <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.322 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-321.058 229.35V158.59l158.822 96.923-158.822 96.922z"></path>
                                        </svg></a>
                                        <div className="ml-2 truncate">TrendyMinds YouTube</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:w-1/3">
                            <div className="py-3 sm:order-none order-3">
                                <h2 className="text-lg font-poppins font-bold text-top-color">About me</h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>

                                <p className="font-poppins text-heading">
                                    I am Amit Pachange, a full-stack developer with extensive experience in building web applications using React, Node.js, and other modern technologies.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:w-1/3">
                            <div className="py-3 sm:order-none order-3">
                                <h2 className="text-lg font-poppins font-bold text-top-color">My Skills</h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>

                                <ul className="font-poppins text-heading">
                                    <li>React.js</li>
                                    <li>Node.js</li>
                                    <li>JavaScript</li>
                                    <li>HTML5</li>
                                    <li>CSS3</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
