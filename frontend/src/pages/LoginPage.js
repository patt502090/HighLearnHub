import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import backgroundImage from "../assets/background.png";
import conf from "../conf/main";
import ax from "../conf/ax";
import { AuthContext, ContextProvider } from "../context/Auth.context";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { FaRegEyeSlash } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const authContext = useContext(AuthContext);
  const { login, changeRole } = authContext || {};
  const [showPassword, setShowPassword] = useState(false);
  const [streakID, setStreakID] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

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
      delete ax.defaults.headers.common["Authorization"];
      let result = await ax.post(`${conf.apiUrlPrefix}${conf.loginEndpoint}`, {
        identifier: email,
        password: password,
      });

      result = await ax.get(`${conf.apiUrlPrefix}${conf.jwtUserEndpoint}`);
      console.log("id", result.data.id);
      checkStreak({ id: result.data.id }); //checkStreak
      changeRole(result.data.role.name);
      if (result.data.image) {
        sessionStorage.setItem(
          "profileURL",
          `${conf.urlPrefix}${result.data.image.url}`
        );
      }
      if (result.data.role.name) {
        setLoading(false);
        if (result.data.role.name === "member") {
          sessionStorage.setItem(
            conf.roleSessionStorageKey,
            conf.memberStorageKey
          );
          setTimeout(() => {
            navigate("/");
          });
          toast.success("เข้าสู่ระบบสำเร็จ!");
        }
      }
      if (result.data.role.name) {
        setLoading(false);
        if (result.data.role.name === "admin") {
          sessionStorage.setItem(
            conf.roleSessionStorageKey,
            conf.adminStorageKey
          );
          setTimeout(() => {
            navigate("/admin");
          });
          toast.success("เข้าสู่ระบบสำเร็จ!");
        }
      }
    } catch (error) {
      setPasswordError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
      setSubmitEnabled(true);
    }
  };

  const handleGoogleLoginClick = () => {
    window.location.href = `${conf.apiUrlPrefix}${conf.googleConnectEndpoint}`;
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const checkStreak = async ({ id }) => {
    console.log("test", id);
    try {
      const responseStreak = await ax.get(
        `${conf.apiUrlPrefix}/users/me?populate=login_streak`
      );
      const userData = responseStreak?.data;

      const steakID = userData?.login_streak?.id;

      if (steakID) {
        const lastLogin = new Date(userData.login_streak.lastLogin);
        console.log("lastLogin", lastLogin);
        const now = new Date();
        console.log("now", now);

        // คำนวณหาเวลาที่ผ่านไประหว่าง lastLogin และ now ในหน่วยชั่วโมง
        const timeDifference = (now - lastLogin) / (1000 * 60 * 60); // หน่วยเป็นชั่วโมง
        console.log("timeDifference", timeDifference);

        // ตรวจสอบว่าเวลาที่ผ่านไปน้อยกว่า 24 ชั่วโมงหรือไม่
        if (timeDifference < 24) {
          // อัปเดต lastLogin เฉยๆ โดยไม่ทำอะไรเพิ่มเติม
          await ax.put(`${conf.apiUrlPrefix}/login-streaks/${steakID}`, {
            data: {
              lastLogin: new Date(),
            },
          });
        } else if (timeDifference >= 24 && timeDifference <= 35) {
          // เพิ่ม CountStreak ขึ้น 1
          await ax.put(`${conf.apiUrlPrefix}/login-streaks/${steakID}`, {
            data: {
              CountStreak: userData.login_streak.CountStreak + 1,
              lastLogin: new Date(),
            },
          });
        } else if (timeDifference > 35) {
          // รีเซ็ต CountStreak เป็น 1
          await ax.put(`${conf.apiUrlPrefix}/login-streaks/${steakID}`, {
            data: {
              CountStreak: 1,
              lastLogin: new Date(),
            },
          });
        }
      } else {
        //หากไม่มีข้อมูล login_streak ให้สร้างข้อมูลใหม่
        const steakNew = await ax.post(`${conf.apiUrlPrefix}/login-streaks`, {
          data: {
            lastLogin: new Date(),
            CountStreak: 1,
            member: { connect: [{ id: id }] },
          },
        });
        console.log("steakNew", steakNew);
      }

      console.log("Streak checked successfully");
    } catch (error) {
      console.error("Error checking streak: ", error);
    }
  };

  return (
    <ContextProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>เข้าสู่ระบบ</title>
      </Helmet>
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="flex items-center justify-center h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-xs md:max-w-sm bg-white border-2 rounded-lg shadow-2xl p-6 ">
          <p className="text-lg font-bold mb-4 mt-3 text-center">
            ลงชื่อเข้าใช้
          </p>
          <p className="text-base mb-5 text-center">
            ยินดีต้อนรับเข้าสู่บัญชีผู้ใช้ HighLearnHub
          </p>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="max-w-md items-center relative">
              <div className="mb-2 block">
                <Label htmlFor="email4" value="อีเมล" className="text-left " />
              </div>
              <TextInput
                id="email4"
                type="email"
                icon={HiMail}
                placeholder="name@highlearnhub.com"
                value={email}
                onChange={handleEmailChange}
                required
                size="27"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div className="max-w-md relative">
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="รหัสผ่าน"
                  className="text-left"
                />
              </div>
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                icon={RiLockPasswordFill}
                placeholder="123456"
                value={password}
                onChange={handlePasswordChange}
                required
                size="27"
              />
              <button
                className="absolute top-[3.35rem] right-2 transform -translate-y-1/2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEyeSlash /> : <HiOutlineEye />}
              </button>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <p
              href="#"
              className="text-sm text-center hover:underline cursor-pointer  gap-2 mb-1"
              onClick={handleRegister}
            >
              ลืมรหัสผ่าน ?
            </p>

            <Button
              type="submit"
              className="w-1/2 mx-auto"
              gradientDuoTone="purpleToPink"
              size="md"
              disabled={!submitEnabled || loading}
            >
              {loading ? <span>กำลังโหลด...</span> : <span>เข้าสู่ระบบ</span>}
            </Button>
          </form>
          <div className="relative my-6">
            <hr className="absolute w-full border-t-2 border-gray-1000" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 bg-white text-gray-1000 text-xs ">
              หรือ
            </span>
          </div>

          <button
            className="px-6 py-2.5 mb-5 mt-12 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 items-center mx-auto"
            onClick={handleGoogleLoginClick}
          >
            <img
              className="w-4 h-4 items-center justify-center"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="text-sm">ดำเนินการต่อด้วย Google</span>
          </button>

          <p
            href="#"
            className="text-sm text-red-500 underline text-center cursor-pointer font-medium mb-2"
            onClick={handleRegister}
          >
            ยังไม่มีบัญชี ?
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate("/home")}
        className="fixed z-90 bottom-10 right-8 bg-gray-500 w-14 h-14 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-gray-500 hover:drop-shadow-2xl hover:animate-bounce duration-300"
      >
        <svg
          className="w-6 h-6 text-white dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </ContextProvider>
  );
}
