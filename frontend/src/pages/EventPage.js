import React from "react";
import backgroundImage from "../assets/background.png";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

export default function EventPage() {
  return (
    <div className="container mx-auto max-w-screen-lg" >
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                เทศกาลลดราคา
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                พบกับการลดราคาพิเศษที่ไม่ควรพลาดในงาน "Spring Sales 2024"
                ที่จะเปิดขายสินค้าและบริการหลากหลายจากผู้ผลิตและธุรกิจชั้นนำ
                ร่วมกับโปรโมชั่นพิเศษและส่วนลดที่น่าตื่นเต้น
                เตรียมพบกับโอกาสในการอัพเกรดสินค้าหรือบริการที่คุณต้องการในราคาที่ย่อมเหลือใจ
                รีบเข้าร่วมกับเทศกาลแห่งความประทับใจนี้ก่อนที่โปรโมชั่นจะสิ้นสุด!
              </p>
              <a
                href="#shopping-section"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Shopping
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
              />
            </div>
          </div>
        </section>
        <section id="shopping-section" class="bg-gray-2 dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
          <div class="container mx-auto">
            <div class="flex flex-wrap -mx-4">
              <div class="w-full px-4 md:w-1/2 xl:w-1/3">
                <div class="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3">
                  <img
                    src="https://cdn.tailgrids.com/2.0/image/application/images/cards/card-01/image-01.jpg"
                    alt="image"
                    class="w-full"
                  />
                  <div class="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                      <a
                        href="javascript:void(0)"
                        class="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                      >
                        ตะลุยข้อสอบเรียลทาม คณิตศาสตร์ ม.ต้น
                      </a>
                    </h3>
                    <p class="text-base leading-relaxed text-body-color dark:text-dark-6 mb-7">
                    สรุปเข้มเนื้อหาทั้ง ฟิสิกส์ เคมี ชีววิทยา โลก และดาราศาสตร์ ครบทุกประเด็นที่ออกสอบบ่อย ๆ
                    </p>
                    <a
                      href="javascript:void(0)"
                      class="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 xl:w-1/3">
                <div class="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3">
                  <img
                    src="https://cdn.tailgrids.com/2.0/image/application/images/cards/card-01/image-02.jpg"
                    alt="image"
                    class="w-full"
                  />
                  <div class="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                      <a
                        href="javascript:void(0)"
                        class="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                      >
                        ตะลุยข้อสอบเรียลทาม วิทยาศาสตร์ ม.ต้น
                      </a>
                    </h3>
                    <p class="text-base leading-relaxed text-body-color mb-7">
                    สรุปเข้มเนื้อหาทั้ง ฟิสิกส์ เคมี ชีววิทยา โลก และดาราศาสตร์ ครบทุกประเด็นที่ออกสอบบ่อย ๆ
                    </p>
                    <a
                      href="javascript:void(0)"
                      class="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 xl:w-1/3">
                <div class="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3">
                  <img
                    src="https://cdn.tailgrids.com/2.0/image/application/images/cards/card-01/image-03.jpg"
                    alt="image"
                    class="w-full"
                  />
                  <div class="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                      <a
                        href="javascript:void(0)"
                        class="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                      >
                        ตะลุยข้อสอบเรียลทาม วิทยาศาสตร์ ม.ต้น
                      </a>
                    </h3>
                    <p class="text-base leading-relaxed text-body-color mb-7">
                    สรุปเข้มเนื้อหาทั้ง ฟิสิกส์ เคมี ชีววิทยา โลก และดาราศาสตร์ ครบทุกประเด็นที่ออกสอบบ่อย ๆ
                    </p>
                    <a
                      href="javascript:void(0)"
                      class="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
