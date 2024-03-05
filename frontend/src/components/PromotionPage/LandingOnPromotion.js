import React from "react";

const PromotionSection = ({ backgroundImage, shoppingSectionId }) => {
  return (
    <section
      className="bg-white dark:bg-gray-900 bg-center bg-cover h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-3xl px-6 py-12 mx-auto text-center flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          เทศกาลลดราคา
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          พบกับการลดราคาพิเศษที่ไม่ควรพลาดในงาน "Spring Sales 2024"
          ที่จะเปิดขายสินค้าและบริการหลากหลายจากผู้ผลิตและธุรกิจชั้นนำ
          ร่วมกับโปรโมชั่นพิเศษและส่วนลดที่น่าตื่นเต้น
          เตรียมพบกับโอกาสในการอัพเกรดสินค้าหรือบริการที่คุณต้องการในราคาที่ย่อมเหลือใจ
          รีบเข้าร่วมกับเทศกาลแห่งความประทับใจนี้ก่อนที่โปรโมชั่นจะสิ้นสุด!
        </p>
        <a
          href={`#${shoppingSectionId}`}
          className="inline-flex items-center justify-center px-8 py-4 mt-8 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
      <img
        src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-cartoon-thai-songkran-festival-characters-and-elephant-illustration-png-image_5936860.png"
        alt="คำอธิบายรูปภาพ"
        className="mt-8 max-w-full float-right"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </section>
  );
};

export default PromotionSection;
