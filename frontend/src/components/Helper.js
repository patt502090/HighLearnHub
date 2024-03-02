import React, { useState } from "react";
const FloatingButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleFormVisibility}
        class="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-cyan-500 before:to-cyan-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
      >
        ติดต่อเรา
      </button>
      {isFormVisible && (
        <div className="absolute bottom-14 right-4 bg-white p-4 rounded-md shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          </form>
        </div>
      )}
      {isFormVisible && (
        <div className="absolute bottom-24 right-4">
          <a href="YOUR_LINE_LINK_HERE" target="_blank" rel="noopener noreferrer">
            <img
              src="YOUR_QR_CODE_IMAGE_URL_HERE"
              alt="Line Icon"
              className="w-10 h-10 rounded-full bg-white shadow-md"
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
