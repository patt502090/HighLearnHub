import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PaymentPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div className='flex flex-col items-center mt-6'>
            <h2 className='text-xl font-bold'>PaymentPage</h2>
            <section className="py-17 bg-gray-100 font-poppins dark:bg-gray-700">
                <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
                    <div>
                        <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 border-gray-800 rounded-md">
                            <div className="flex flex-col md:flex-row items-center justify-center mb-6 -mx-4 md:flex md:mb-8">
                                <div className="md:w-1/2 p-4">
                                    <img src="https://ตลับหมึกปริ้นเตอร์.com/sites/2110/files/s/articles/o_1bo96me2d2s61gg01vq1g5kkrk7.jpg" alt="Thai Bank" className="h-48 w-auto mx-auto" />
                                </div>
                                <div className="md:w-1/2 p-4">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-xl font-semibold text-center mt-2">ธนาคารไทยพาณิชย์</p>
                                        <p className="text-lg text-center">ชื่อบัญชี: Jone Doe</p>
                                        <p className="text-lg text-center">หมายเลขบัญชี: 123-4-56789-0</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-center mb-6 -mx-4 md:flex md:mb-8">
                                <div className="md:w-1/2 p-4">
                                    <img src="https://mpics.mgronline.com/pics/Images/566000003112201.JPEG" alt="Thai Bank" className="h-48 w-auto mx-auto" />
                                </div>
                                <div className="md:w-1/2 p-4">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-xl font-semibold text-center mt-2">ธนาคารไทยกรุงไทย</p>
                                        <p className="text-lg text-center">ชื่อบัญชี: Jone Doe</p>
                                        <p className="text-lg text-center">หมายเลขบัญชี: 123-4-56789-0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="py-4">
                <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:mr-4">เเนบสลิปรูปภาพ</label>
                <Link Link to="/finishpayment">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:ml-4">ยืนยันการชำระเงิน</button>
                </Link>
            </div>
        </div>
    )
}
