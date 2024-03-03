import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import conf from '../conf/main';
import ax from '../conf/ax';
import { CircularProgress } from '@mui/material';

export default function UserModal(props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        try {
            setLoading(true);
            const fetchData = async () => {
                const response = await ax.get(`${conf.apiUrlPrefix}/users/${props.profileId}?populate=image&populate=role`);
                setData(response.data);
                console.log(response);
            }
            fetchData();
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [props]);

    return (
        <>
            <Modal show={props.openModal} onClose={() => props.setOpenModal(false)}>
                <Modal.Header>Profile</Modal.Header>
                <Modal.Body>
                    {(loading) ? <p><CircularProgress /></p> : <div className="max-w-xs mx-auto">
                        <div className="bg-white rounded-lg p">
                            <div className="photo-wrapper p-2">
                                {(data?.image) ?
                                    <img className="object-cover w-32 h-32 rounded-full mx-auto" src={`${conf.urlPrefix}${data?.image.url}`} alt="" />
                                    :
                                    <svg class="w-32 h-32 rounded-full mx-auto text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12 20a8 8 0 0 1-5-1.8v-.6c0-1.8 1.5-3.3 3.3-3.3h3.4c1.8 0 3.3 1.5 3.3 3.3v.6a8 8 0 0 1-5 1.8ZM2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm10-5a3.3 3.3 0 0 0-3.3 3.3c0 1.7 1.5 3.2 3.3 3.2 1.8 0 3.3-1.5 3.3-3.3C15.3 8.6 13.8 7 12 7Z" clip-rule="evenodd" />
                                    </svg>
                                }
                            </div>
                            <div className="p-2 text-center">
                                <h3 className="text-xl text-gray-900 font-medium leading-8">{data?.username}</h3>
                                <div className="text-gray-400 text-xs font-semibold">
                                    <p>{(data?.role?.name === "member") ? "สมาชิก" : "ผู้ดูแล"}</p>
                                </div>
                                <table className="text-sm my-3 mx-auto">
                                    <tbody>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">ชื่อ</td>
                                            <td className="px-2 py-2">{`${data?.first_name} ${data?.last_name}`}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">เบอร์โทรศัพท์</td>
                                            <td className="px-2 py-2">{data?.phonenum ? data?.phonenum : "ไม่ระบุ"}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">อีเมล</td>
                                            <td className="px-2 py-2">{data?.email ? data?.email : "ไม่ระบุ"}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-2 text-gray-500 font-semibold">ไอดีไลน์</td>
                                            <td className="px-2 py-2">{data?.line_id ? data?.line_id : "ไม่ระบุ"}</td>
                                        </tr>
                                        {(data?.role?.name === "member")
                                            ?
                                            <tr>
                                                <td className="px-2 py-2 text-gray-500 font-semibold">การสั่งซื้อ</td>
                                                <td className="px-2 py-2"><a href={`/admin/course/${data?.id}`} className='underline'>ดูรายละเอียด</a></td>
                                            </tr>
                                            : <></>}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}
                </Modal.Body>
            </Modal>
        </>
    );
}
