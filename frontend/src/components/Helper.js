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
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md focus:outline-none"
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
