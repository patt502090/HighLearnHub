import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import backgroundImage from "../assets/background.png";
import conf from "../conf/main";
import ax from "../conf/ax";
import { ContextProvider } from "../context/Auth.context";
import { FaPhoneSquareAlt } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterAccountPage() {
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenum: "",
    citizenID: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);
    setLoading(true);

    try {
      if (formData.password === formData.confirmPassword) {
        const postData = {
          username: formData.username,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
          cirizenID: formData.citizenID,
          phonenum: formData.phonenum,
        };
  
        const result = await ax.post(
          `${conf.apiUrlPrefix}${conf.registerEndpoint}`,
          postData
        );
        console.log("Registration successful:", result.data);
        navigate("/login");
      } else {
        console.error("Password confirmation mismatch");
      }
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    } finally {
      setLoading(false);
      setSubmitEnabled(true);
    }
  };

  return (
    <ContextProvider>
      <Toaster />
      <div
        className="flex items-center justify-center h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container w-full max-w-md bg-white border-2 rounded-lg shadow-2xl p-6 ">
          <p className="text-lg font-bold mb-4 text-center">
            สมัครบัญชีผู้ใช้ด้วยอีเมล
          </p>
          <p className="text-sm mb-5 text-center">กรุณากรอกข้อมูลให้ครบถ้วน</p>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">

          <div className="w-full">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                icon={HiMail}
                placeholder="name@flowbite.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex-2">
              <Label htmlFor="first_name" value="First Name" />
              <TextInput
                id="first_name"
                type="text"
                placeholder="John"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                size={16.99}
              />
            </div>

            <div className="flex-2">
              <Label htmlFor="last_name" value="Last Name" />
              <TextInput
                id="last_name"
                type="text"
                placeholder="Doe"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                size={17}
              />
            </div>

            <div className="flex-2">
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                type="text"
                placeholder="johndoe"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                size={16.99}
              />
            </div>

            <div className="flex-2">
              <Label htmlFor="citizenID" value="CitizenID" />
              <TextInput
                id="citizenID"
                type="text"
                placeholder="12345"
                name="citizenID"
                value={formData.citizenID}
                onChange={handleChange}
                required
                size={17}
              />
            </div>


            <div className="w-full">
              <Label htmlFor="phone" value="Phone Number" />
              <TextInput
                id="phone"
                type="text"
                placeholder="191"
                name="phonenum"
                value={formData.phonenum}
                icon={FaPhoneSquareAlt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                icon={RiLockPasswordFill}
                placeholder="123456"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <Label htmlFor="confirmPassword" value="Confirm Password" />
              <TextInput
                id="confirmPassword"
                type="password"
                icon={RiLockPasswordFill}
                placeholder="123456"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="flex-1 mt-4 mb-6 px-6 mx-auto"
              gradientDuoTone="purpleToPink"
              size="md"
              disabled={!submitEnabled || loading}
            >
              สมัครบัญชีผู้ใช้
            </Button>
          </form>

          <p className="text-sm text-center cursor-pointer font-medium mb-4">
            หากคุณมีบัญชีผู้ใช้งานแล้ว{" "}
            <span className="text-blue-700 underline" onClick={handleLogin}>
              เข้าสู่ระบบ
            </span>
          </p>
        </div>
      </div>
    </ContextProvider>
  );
}
