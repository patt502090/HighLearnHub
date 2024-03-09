import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

import backgroundImage from "../assets/background.png";
import conf from "../conf/main";
import { ContextProvider } from "../context/Auth.context";
import { Helmet } from "react-helmet";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLoginClick = () => {
    window.location.href = `${conf.apiUrlPrefix}${conf.googleConnectEndpoint}`;
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegisterAccount = () => {
    navigate("/registerAccount");
  };

  return (
    <ContextProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ยินดีต้อนรับเข้าสู่บัญชีผู้ใช้</title>
        </Helmet>
      <div data-testid="ancestor"
        className="flex items-center justify-center h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container w-auto bg-white border-2 rounded-lg shadow-2xl p-6 flex flex-col " data-testid="descendant">
          <p className="text-lg font-bold mb-4 mt-4 text-center">ลงทะเบียน</p>
          <p className="text-base mb-6 text-center">
            ยินดีต้อนรับเข้าสู่บัญชีผู้ใช้ HighLearnHub
          </p>
          <Button
            data-testid="ButtonRegisterAccount"
            className=" mb-3 px-6 items-center justify-center"
            gradientDuoTone="purpleToBlue"
            size="md"
            onClick={handleRegisterAccount}
          >
            ลงทะเบียนผู้ใช้ด้วยอีเมล
          </Button>

          <div className="relative my-6 ">
            <hr className="absolute w-full border-t-2 border-gray-1000" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 bg-white text-gray-1000 text-xs ">
              หรือ
            </span>
          </div>

          <button
            data-testid="ButtonGoogleLoginClick"
            className="px-6 py-2.5 mb-4 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 items-center mx-auto"
            onClick={handleGoogleLoginClick}
          >
            <img
              className="w-4 h-4"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="text-sm">ดำเนินการต่อด้วย Google</span>
          </button >
          <p className="text-sm text-center cursor-pointer font-medium mb-4">
            หากคุณมีบัญชีผู้ใช้งานแล้ว{" "}
            <span data-testid="ButtonHaveAcccout" className="text-blue-700 underline" onClick={handleLogin}>
              เข้าสู่ระบบ
            </span>
          </p>
        </div>
      </div>
    </ContextProvider>
  );
}
