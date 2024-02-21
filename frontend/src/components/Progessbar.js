import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Progessbar() {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1);

    React.useEffect(() => {
        if (location.pathname === "/mycart") {
            setCurrentStep(1);
        } else if (location.pathname === "/payment") {
            setCurrentStep(2);
        } else if (location.pathname === "/finishpayment") {
            setCurrentStep(3);
        }
    }, [location]);

    return (
        <div className="flex flex-col max-w-2xl mx-auto font-[sans-serif] text-[#232A70]" style={{ marginTop: "20px" }}>
            <div className="flex justify-between items-start text-center gap-4">
                <div className={`flex flex-col justify-center items-center ${currentStep >= 1 ? "text-black" : "text-gray-300"}`}>
                    <div className={`bg-gray-300 w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-[#232A70]" : "bg-gray-300"}`}>1</div>
                    <p className="text-sm mt-1.5 font-semibold">ตะกร้าสินค้า</p>
                </div>
                <div className={`flex flex-col justify-center items-center ${currentStep >= 2 ? "text-black" : "text-gray-300"}`}>
                    <div className={`bg-blue-500 w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-[#232A70]" : "bg-gray-300"}`}>2</div>
                    <p className="text-sm mt-1.5 font-semibold">ชำระเงิน</p>
                </div>
                <div className={`flex flex-col justify-center items-center ${currentStep >= 3 ? "text-black" : "text-gray-300"}`}>
                    <div className={`bg-gray-300 w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-[#232A70]" : "bg-gray-300"}`}>3</div>
                    <p className="text-sm mt-1.5 font-semibold">เสร็จสิ้น</p>
                </div>
            </div>
            
            <div className="bg-gray-300 rounded-full w-full h-2.5 mt-4">
                <div className={`w-${currentStep}/3 h-full rounded-full bg-[#232A70] shadow-md flex items-center relative transition-all duration-300`}>
                    <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
                </div>
            </div>
        </div>
    );
}
