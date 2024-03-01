import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import ax from '../conf/ax';
import conf from '../conf/main';
import SearchMemberBar from '../components/SearchMemberBar';
import UserModal from '../components/UserModal';

function ListUserPage() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [profileId, setProfileId] = useState('');
    const itemsPerPage = 5;

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await ax.get(`${conf.apiUrlPrefix}/users?populate[bookings][populate]=course&populate=image`);
                setData(response.data);
            }
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='h-screen background-image'>
            <Navbar />
            <div className='pt-24'></div>
            <SearchMemberBar data={data} openModal={openModal} setOpenModal={setOpenModal} setProfileId={setProfileId} />
            <UserModal openModal={openModal} setOpenModal={setOpenModal} profileId={profileId}/>
            <div className="h-screen mx-auto max-w-screen-lg w-screen px-4 py-8 sm:px-8">
                <div className="h-4/5 rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-400 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                    <th className="px-5 py-3 text-base">ชื่อผู้ใช้</th>
                                    <th className="max-lg:hidden px-5 py-3 text-base">ชื่อ-สกุล</th>
                                    <th className="px-5 py-3 text-base">อีเมล</th>
                                    <th className="max-lg:hidden px-5 py-3 text-base">ยอดรวม</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {currentItems.map((item, index) => (
                                    <tr key={index} className=''>
                                        <td onClick={() => [setOpenModal(true),setProfileId(item.id)]} className="flex items-center border-b border-gray-200 bg-white cursor-pointer hover:bg-slate-100 px-5 py-5 text-sm">
                                            <div className="h-8 w-8 mr-2 flex-shrink-0">
                                                {(item.image) ?
                                                    <img className="object-cover w-8 h-8 rounded-full" src={`${conf.urlPrefix}${item.image.url}`} alt="" />
                                                    :
                                                    <svg class="h-full w-full rounded-full text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z" clip-rule="evenodd" />
                                                    </svg>
                                                }
                                            </div>
                                            <p className="whitespace-no-wrap">{item.username}</p>
                                        </td>
                                        <td className="max-lg:hidden border-b border-gray-200 bg-white  px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap">{`${item.first_name} ${item.last_name}`}</p>
                                        </td>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap">{item.email}</p>
                                        </td>
                                        <td className="max-lg:hidden border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap">
                                                {item.bookings.reduce((total, booking) => total + (booking.course?.price || 0), 0)} บาท
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                        <span className="text-xs text-gray-600 sm:text-sm"> Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} Profiles </span>
                        <div className="mt-2 inline-flex sm:mt-0">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                            >
                                {'<'}
                            </button>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={indexOfLastItem >= data.length}
                                className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                            >
                                {'>'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListUserPage;
