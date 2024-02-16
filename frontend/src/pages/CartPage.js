import React, { useEffect, useState } from "react";
import ax from '../conf/ax'
import conf from '../conf/main'
import { Link } from "react-router-dom";

export default function CartPage() {
    const [coursebooked, setCoursebooked] = useState();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await ax.get(conf.apiUrlPrefix + '/courses?populate[bookings][filters][payment_status][$eq]=false&populate=image');
                console.log(response)
                const filterDatas = response.data.data.filter(item =>
                    item.attributes.bookings.data.length !== 0
                );
                setCoursebooked(filterDatas)
            } catch (error) {
                console.error("Error fetching Data:", error);
            }
        };

        fetchData();
    }, []);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        coursebooked?.forEach(item => {
            totalPrice += item.attributes.price * item.attributes.bookings.data.length;
        });
        return totalPrice;
    };

    console.log(coursebooked)
    return (
        <div className='flex flex-col items-center mt-6'>
            <h className='text-xl font-bold'>MyCart</h>
            <div>
                {coursebooked?.map((item) => (

                    <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={"http://localhost:1337" + item.attributes.image.data.attributes.url} alt=""></img>
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.attributes.title}</h5>
                            <p>{item.attributes.description}</p>

                            <hr className="mt-6 " />
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-between">
                                <span>ราคา {item.attributes.price} บาท,</span>
                                <span>x{item.attributes.bookings.data.length}</span>

                            </p>
                        </div>
                    </div>
                ))}

                <div>
                    <h1>ราคารวมทั้งสิ้น: {calculateTotalPrice()} </h1>
                    <Link to={'/payment'}>
                        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            ชำระเงิน</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}