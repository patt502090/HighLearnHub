import React from 'react'
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import conf from '../../conf/main';

function FilterSubject() {
    const navigate = useNavigate(); 
    useEffect(() => {
        AOS.init();
    },[])

    return (
        <div className='max-lg:hidden grid grid-cols-1 md:grid-cols-5 gap-4 px-4 md:px-12 container py-10 overflow-x-auto justify-center'>
            <article onClick={() => navigate('/course/filters/math')} class="mx-auto cursor-pointer group w-full h-10 relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm transition-transform transform hover:scale-105 hover:bg-gray-200">
                <img src={`${conf.urlPrefix}/uploads/Math_Banner_507d7e2edf.jpg`} alt="University of Southern California" class="group-hover:opacity-50 absolute inset-0 h-full w-full object-cover transition-opacity" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 class="z-10 mt-3 text-3xl font-bold text-white transition-opacity ">คณิตศาสตร์</h3>
                <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 transition-opacity hover:text-gray-500">City of love</div>
            </article>
            <article onClick={() => navigate('/course/filters/science')} class="cursor-pointer group w-full h-10 relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto transition-transform transform hover:scale-105 hover:bg-gray-200">
                <img src={`${conf.urlPrefix}/uploads/Biology_Banner_dab7986092.jpg`} alt="University of Southern California" class="group-hover:opacity-50 absolute inset-0 h-full w-full object-cover transition-opacity" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 class="z-10 mt-3 text-3xl font-bold text-white transition-opacity ">วิทยาศาสตร์</h3>
                <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 transition-opacity hover:text-gray-500">City of love</div>
            </article>
            <article onClick={() => navigate('/course/filters/eng')} class="cursor-pointer group w-full h-10 relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto transition-transform transform hover:scale-105 hover:bg-gray-200">
                <img src={`${conf.urlPrefix}/uploads/English_Banner_1072c3d3f3.jpg`} alt="University of Southern California" class="group-hover:opacity-50 absolute inset-0 h-full w-full object-cover transition-opacity" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 class="z-10 mt-3 text-3xl font-bold text-white transition-opacity ">ภาษาอังกฤษ</h3>
                <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 transition-opacity hover:text-gray-500">City of love</div>
            </article>
            <article onClick={() => navigate('/course/filters/thai')} class="cursor-pointer group w-full h-10 relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto transition-transform transform hover:scale-105 hover:bg-gray-200">
                <img src={`${conf.urlPrefix}/uploads/Thai_Banner_ca88d9f20b.jpg`} alt="University of Southern California" class="group-hover:opacity-50 absolute inset-0 h-full w-full object-cover transition-opacity" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 class="z-10 mt-3 text-3xl font-bold text-white transition-opacity ">ภาษาไทย</h3>
                <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 transition-opacity hover:text-gray-500">City of love</div>
            </article>
            <article onClick={() => navigate('/course/filters/socialstudy')} class="cursor-pointer group w-full h-10 relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto transition-transform transform hover:scale-105 hover:bg-gray-200">
                <img src={`${conf.urlPrefix}/uploads/Social_Banner_fece10c97b.jpg`} alt="University of Southern California" class="group-hover:opacity-50 absolute inset-0 h-full w-full object-cover transition-opacity" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 class="z-10 mt-3 text-3xl font-bold text-white transition-opacity ">สังคมศึกษา</h3>
                <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 transition-opacity hover:text-gray-500">City of love</div>
            </article>
        </div>
    )
}

export default FilterSubject;