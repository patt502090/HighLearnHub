import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Progessbar from "../components/Progessbar";
import backgroundImage from "../assets/background.png";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Helmet } from "react-helmet";

export default function PaymentPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadImg = async () => {
        const formData = new FormData();

        formData.append("field", "image");
        formData.append("ref", "api::course.course");
        // formData.append("refId", props.course.id);
        formData.append("files", selectedFile[0]);

        ax.post(conf.apiUrlPrefix + `/upload`, formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const openFile = () => {
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            window.open(fileURL);
        } else {
            alert("โปรดเลือกไฟล์ก่อน");
        }
    };

    const handleFileDelete = () => {
        setSelectedFile(null);
    };

    const handlePaymentConfirmation = () => {
        localStorage.setItem("paymentSlip", selectedFile);
    };

    return (
        <>
            <div className="background-image">
                <Navbar />
                <Progessbar></Progessbar>
                <Helmet>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>ดำเนินการชำระเงิน</title>
                </Helmet>
                <div className='flex flex-col items-center mt-6'>
                    <h2 className='text-xl font-bold'>หน้าชำระเงิน</h2>
                    <section className="mt-6 py-17 bg-gray-100 font-poppins dark:bg-gray-700">
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
                        <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:mr-4">อัปโหลดสลิปรูปภาพ</label>
                        {selectedFile && (
                            <>
                                <button onClick={openFile} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:mr-4">ดูไฟล์</button>
                                <button onClick={handleFileDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:mr-4">ลบไฟล์</button>
                            </>
                        )}
                        <Link to={{
                            pathname: "/finishpayment",
                        }}>
                            <button onClick={handlePaymentConfirmation} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:ml-4">ยืนยันการชำระเงิน</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
