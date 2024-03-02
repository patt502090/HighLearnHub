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
        </div>
      )}
      {isFormVisible && (
        <div className="absolute bottom-24 right-4">
          <a href="https://line.me/R/ti/p/@210tmlid?oat_content=url" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
              <path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"></path>
              <path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"></path>
            </svg>
          </a>
        </div>
      )}
      {isFormVisible && (
        <div className="absolute bottom-40 right-5">
          <a href="https://www.facebook.com/people/Highlearnhub/61556519805077/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 30 30">
              <path fill="#8bb7f0" d="M15 1A14 14 0 1 0 15 29A14 14 0 1 0 15 1Z"></path>
              <path fill="#fff" d="M28.921 16.479c.002-.02.006-.039.008-.059C28.926 16.439 28.922 16.459 28.921 16.479zM1.071 16.415c.003.027.008.053.011.08C1.079 16.468 1.074 16.441 1.071 16.415zM16.996 18.71h3.623l.569-3.68h-4.192v-2.012c0-1.529.5-2.885 1.93-2.885h2.298V6.922c-.404-.054-1.257-.174-2.871-.174-3.37 0-5.345 1.78-5.345 5.834v2.449H9.544v3.68h3.464v9.92c.684.103 1.379.173 2.093.173.644 0 1.274-.059 1.895-.143V18.71z"></path>
              <g>
                <path fill="#4e7ab5" d="M15,2c7.168,0,13,5.832,13,13s-5.832,13-13,13S2,22.168,2,15S7.832,2,15,2 M15,1 C7.268,1,1,7.268,1,15s6.268,14,14,14s14-6.268,14-14S22.732,1,15,1L15,1z"></path>
              </g>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
