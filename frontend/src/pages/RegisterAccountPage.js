import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import backgroundImage from "../assets/background.png";
import conf from "../conf/main";
import ax from "../conf/ax";
import { ContextProvider } from "../context/Auth.context";

export default function RegisterAccountPage() {
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
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
      if (formData.email === formData.confirmEmail && formData.password === formData.confirmPassword) {
        const result = await ax.post(`${conf.apiUrlPrefix}${conf.registerEndpoint}`, {
          email: formData.email,
          password: formData.password,
        });
  
        console.log("Registration successful:", result.data);

      } else {
        console.error("Email or password confirmation mismatch");
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
      <div
        className="flex items-center justify-center h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container w-auto bg-white border-2 rounded-lg shadow-2xl p-6">
          <p className="text-lg font-bold mb-4 text-center">
            สมัครบัญชีผู้ใช้ด้วยอีเมล
          </p>
          <p className="text-sm mb-5 text-center">กรุณากรอกข้อมูลให้ครบถ้วน</p>
          <form className="grid grid-cols-2 gap-4 justify-center" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="firstName" value="First Name" />
              <TextInput
                id="firstName"
                type="text"
                placeholder="John"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="lastName" value="Last Name" />
              <TextInput
                id="lastName"
                type="text"
                placeholder="Doe"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                type="text"
                placeholder="johndoe"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
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

            <div>
              <Label htmlFor="confirmEmail" value="Confirm Email" />
              <TextInput
                id="confirmEmail"
                type="email"
                icon={HiMail}
                placeholder="name@flowbite.com"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div>
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

            <div>
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
              className="col-span-2 mt-4 mb-6 px-6"
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
