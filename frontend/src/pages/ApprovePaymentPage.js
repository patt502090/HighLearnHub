import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/background.png";

export default function ApprovePaymentPage() {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        fetchUploadedFiles();
    }, []);

    const fetchUploadedFiles = async () => {
        try {
            const response = await ax.get(`${conf.api_url}/uploadedFiles`);
            setUploadedFiles(response.data);
        } catch (error) {
            console.error("Error fetching uploaded files:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center mt-6'>
                <h2 className='text-xl font-bold'>ตรวจสอบการชำระเงิน</h2>
                <div>
                    {uploadedFiles.map(file => (
                        <div key={file.id} className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 border-gray-800 rounded-md">
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold">{file.name}</p>
                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
