import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import backgroundImage from "../assets/background.png";
import conf from "../conf/main";
import ax from "../conf/ax";
import { AuthContext, ContextProvider } from "../context/Auth.context";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const authContext = useContext(AuthContext);
  const { login } = authContext || {};
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);
    setLoading(true);
    login(email, password);

    try {
      let result = await ax.post(`${conf.apiUrlPrefix}${conf.loginEndpoint}`, {
        identifier: email,
        password: password,
      });

      result = await ax.get(`${conf.apiUrlPrefix}${conf.jwtUserEndpoint}`);
      console.log("login result:", result.data);

      if (result.data.role.name) {
        console.log("role:", result.data.role.name);

        if (result.data.role.name === "Member") {
          navigate("/");
        }
      }
    } catch (error) {
      setPasswordError("Invalid email or password");
    } finally {
      setLoading(false);
      setSubmitEnabled(true);
    }
  };
  const handleGoogleLoginClick = () => {
    window.location.href = `${conf.apiUrlPrefix}${conf.googleConnectEndpoint}`;
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
          <p className="text-lg font-bold mb-4 mt-6 text-center">
            ลงชื่อเข้าใช้
          </p>
          <p className="text-base mb-5 text-center">
            ยินดีต้อนรับเข้าสู่บัญชีผู้ใช้ HighLearnHub
          </p>
          <form
            className="flex flex-col gap-3 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="email4" value="Email" className="text-left" />
              </div>
              <TextInput
                id="email4"
                type="email"
                icon={HiMail}
                placeholder="name@flowbite.com"
                value={email}
                onChange={handleEmailChange}
                required
                size="35"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div className="max-w-md mt-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="Password"
                  className="text-left"
                />
              </div>
              <TextInput
                id="password"
                type="password"
                icon={RiLockPasswordFill}
                placeholder="123456"
                value={password}
                onChange={handlePasswordChange}
                required
                size="35"
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 text-left">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            <Button
              type="submit"
              className="mt-4 mb-6 px-6"
              gradientDuoTone="purpleToPink"
              size="md"
              disabled={!submitEnabled || loading}
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </form>
          <div className="relative my-4 mb-6">
            <hr className="absolute w-full border-t-2 border-gray-1000" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 bg-white text-gray-1000 text-xs ">
              OR
            </span>
          </div>

          <button
            className="px-6 py-2.5 mb-4 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 items-center mx-auto"
            onClick={handleGoogleLoginClick}
          >
            <img
              className="w-4 h-4"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="text-sm">Login with Google</span>
          </button>
        </div>
      </div>
    </ContextProvider>
  );
}
