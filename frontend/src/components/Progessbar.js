import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Progessbar() {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1); 

    useEffect(() => {
        if (location.pathname === "/Mycart") {
            setCurrentStep(1);
        } else if (location.pathname === "/payment") {
            setCurrentStep(2);
        } else if (location.pathname === "/finishpayment") {
            setCurrentStep(3);
        }
    }, [location]);

    return (
        <div className="flex flex-col max-w-2xl mx-auto text-[#232A70]" style={{ marginTop: "20px" }}>
            <div className="flex justify-between items-start text-center gap-4">
                <div className={`flex flex-col justify-center items-center ${currentStep >= 1 ? "text-black" : "text-gray-400"}`}>
                    <div className={`bg-[#232A70] w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-[#232A70]" : "bg-gray-400"}`}>1</div>
                    <p className="text-sm mt-1.5 font-semibold">ตะกร้าสินค้า</p>
                </div>
                <div className={`flex flex-col justify-center items-center ${currentStep >= 2 ? "text-black" : "text-gray-400"}`}>
                    <div className={`bg-[#232A70] w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-[#232A70]" : "bg-gray-400"}`}>2</div>
                    <p className="text-sm mt-1.5 font-semibold">ชำระเงิน</p>
                </div>
                <div className={`flex flex-col justify-center items-center ${currentStep >= 3 ? "text-black" : "text-gray-400"}`}>
                    <div className={`bg-[#232A70] w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-[#232A70]" : "bg-gray-400"}`}>3</div>
                    <p className="text-sm mt-1.5 font-semibold">เสร็จสิ้น</p>
                </div>
            </div>
            
            <div className="bg-gray-400 rounded-full w-full h-3 mt-4">
                <div className={`w-${currentStep}/3 h-full rounded-full bg-[#232A70] shadow-md flex items-center relative transition-all duration-300`}>
                    <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
                </div>
            </div>
        </div>
    );
}
