import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProfilePage() {
    const [userData, setUserData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`http://localhost:1337/api/users/${id}`);
                const userData = await userResponse.json();
                setUserData(userData);
                console.log(userData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="bg-gray-100 p-4">
            <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">
                <div className="flex rounded-t-lg bg-top-color sm:px-2 w-full">
                    <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
                        <img src={userData && userData.image} alt="Profile" />
                    </div>

                    <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
                        <p className="font-poppins font-bold text-heading sm:text-4xl text-2xl">
                        Name: {userData && `${userData.first_name} ${userData.last_name}`}
                        </p>
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
                                        <p>{userData && userData.contact}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:w-1/3">
                            <div className="py-3 sm:order-none order-3">
                                <h2 className="text-lg font-poppins font-bold text-top-color">About me</h2>
                                <div className="border-2 w-20 border-top-color my-3"></div>

                                <p className="font-poppins text-heading">
                                    I am {userData && userData.first_name} {userData && userData.last_name}, a full-stack developer with extensive experience in building web applications using React, Node.js, and other modern technologies.
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
