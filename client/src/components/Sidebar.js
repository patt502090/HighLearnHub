import * as React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { Collapse, ListItemText } from "@mui/material";
import { Dropdown } from "flowbite-react";
import ax from "../conf/ax";
import conf from "../conf/main";

export default function SidebarWithBurgerMenu({ userData, logout }) {
  const { state: ContextState } = useContext(AuthContext);
  const { userRole } = ContextState;
  const profileURL = sessionStorage.getItem("profileURL");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // const [lastLoginDate, setLastLoginDate] = useState(null);
  const [open, setOpen] = React.useState(true);
  const [countStreak, setCountStreak] = useState(null);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchCountSteak = async () => {
      try {
        const CountStreakResponse = await ax.get(
          `${conf.apiUrlPrefix}/users/me?populate=login_streak`
        );
        const Count = CountStreakResponse.data.login_streak.CountStreak;
        setCountStreak(Count);
        console.log("Count", Count);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountSteak();
  }, []);

  // useEffect(() => {
  //     const savedStreak = localStorage.getItem('loginStreak');
  //     const savedLastLoginDate = localStorage.getItem('lastLoginDate');
  //     if (savedStreak) {
  //         setLoginStreak(parseInt(savedStreak));
  //     }
  //     if (savedLastLoginDate) {
  //         setLastLoginDate(new Date(savedLastLoginDate));
  //     }
  // }, []);

  // const handleLogin = () => {
  //     handleLoginStreak();
  // };

  // const handleLoginStreak = () => {
  //     const currentDate = new Date();
  //     const lastLoginDateString = localStorage.getItem('lastLoginDate');
  //     let lastLoginDate = null;

  //     if (lastLoginDateString) {
  //         lastLoginDate = new Date(lastLoginDateString);
  //     }

  //     if (lastLoginDate && !isSameDay(lastLoginDate, currentDate)) {
  //         const diffInDays = differenceInDays(currentDate, lastLoginDate);

  //         if (diffInDays >= 1) {
  //             localStorage.setItem('loginStreak', 1);
  //             setLoginStreak(1);
  //         } else {
  //             const newStreak = loginStreak + 1;
  //             localStorage.setItem('loginStreak', newStreak);
  //             setLoginStreak(newStreak);
  //         }

  //         localStorage.setItem('lastLoginDate', currentDate.toString());
  //     }
  // };

  // const isSameDay = (date1, date2) => {
  //     return (
  //         date1.getFullYear() === date2.getFullYear() &&
  //         date1.getMonth() === date2.getMonth() &&
  //         date1.getDate() === date2.getDate()
  //     );
  // };

  // const differenceInDays = (date1, date2) => {
  //     const diffInTime = Math.abs(date2.getTime() - date1.getTime());
  //     return Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  // };

  const toggleDrawer = (right, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [right]: open });
  };

  if (userRole === "admin") {
    return (
      <>
        <div>
          <React.Fragment>
            <Button onClick={toggleDrawer("right", true)}>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </Button>
            <Drawer
              anchor="right"
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer("right", false)}
                onKeyDown={toggleDrawer("right", false)}
              >
                <div className="mb-2 flex items-center gap-4 p-4">
                  <img
                    src="https://wd09-admin.cloud-workshop.online/uploads/_8072a878b4.png"
                    alt="brand"
                    className="h-10 w-10"
                  />
                  <p variant="h5" color="blue-gray">
                    HighLearnHub
                  </p>
                </div>
                <hr />
                <Link to={`/profile/${userData && userData.id}`}>
                  <List>
                    <ListItem disablePadding href="">
                      <ListItemButton>
                        {profileURL ? (
                          <img
                            className="object-cover w-6 h-6 rounded-full"
                            src={profileURL}
                            alt="proflie"
                          ></img>
                        ) : (
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <p className="ml-2">{userData.username}</p>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Link>
                <hr className="my-2 border-blue-gray-50" />
                <Link to="/admin">
                  <List>
                    <ListItem disablePadding href="">
                      <ListItemButton>
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
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
                        <p className="ml-2">หน้าแรก</p>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Link>
                <Link to="/admin/addcourse">
                  <List>
                    <ListItem disablePadding href="">
                      <ListItemButton>
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="ml-2">เพิ่มคอร์ส</p>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Link>

                <Link to="/admin/addAnnouncement">
                  <List>
                    <ListItem disablePadding href="">
                      <ListItemButton>
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M9.6 2.6A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2l.5.3a2 2 0 0 1 2.9 0l1.4 1.3a2 2 0 0 1 0 2.9l.1.5h.1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2l-.3.5a2 2 0 0 1 0 2.9l-1.3 1.4a2 2 0 0 1-2.9 0l-.5.1v.1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2l-.5-.3a2 2 0 0 1-2.9 0l-1.4-1.3a2 2 0 0 1 0-2.9l-.1-.5H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2l.3-.5a2 2 0 0 1 0-2.9l1.3-1.4a2 2 0 0 1 2.9 0l.5-.1V4c0-.5.2-1 .6-1.4ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clip-rule="evenodd"/>
  </svg>
  
                        <p className="ml-2">เพิ่มประกาศ</p>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Link>

                <Link to="/admin/dashboard">
                  <List>
                    <ListItem disablePadding href="">
                      <ListItemButton>
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 7.2c4.4 0 8-1.2 8-2.6C20 3.2 16.4 2 12 2S4 3.2 4 4.6C4 6 7.6 7.2 12 7.2ZM12 22c5 0 8-1.7 8-2.6V15h-.2a7.8 7.8 0 0 1-1.3.7l-.2.1c-2 .7-4.2 1-6.3 1a19 19 0 0 1-6.3-1h-.2a10.1 10.1 0 0 1-1.3-.7L4 15v4.4c0 1 3 2.6 8 2.6Zm7-14c-.1.2-.3.2-.5.3l-.2.1c-2 .7-4.2 1-6.3 1a19 19 0 0 1-6.3-1h-.2a10.2 10.2 0 0 1-1.3-.7L4 7.6V12c0 1 3 2.6 8 2.6s8-1.7 8-2.6V7.6h-.2a7.8 7.8 0 0 1-.7.5Z" />
                        </svg>
                        <p className="ml-2">แดชบอร์ด</p>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Link>
                <Link to="/admin/approve">
                  <List>
                    <ListItem disablePadding href="">
                      <ListItemButton>
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <p className="ml-2">ยืนยันการชำระเงิน</p>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Link>
                <Link to="/admin/userlist">
                  <List>
                    <ListItem disablePadding href="">
                      <ListItemButton>
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1c0 1.1.9 2 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3c0 .6-.4 1-1 1h-6a1 1 0 0 1-1-1Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p className="ml-2">ตรวจสอบสมาชิก</p>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Link>
                <div className="absolute inset-x-0 bottom-0 h-16">
                  <hr className="border-blue-gray-50" />
                  <div className="flex items-center gap-4">
                    <List>
                      <ListItem disablePadding href="">
                        <ListItemButton
                          style={{ width: "250px" }}
                          onClick={() => logout(true)}
                        >
                          <svg
                            className="w-6 h-6 text-red-700 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                            />
                          </svg>
                          <p className="ml-2 text-red-700">ออกจากระบบ</p>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </div>
                </div>
              </Box>
            </Drawer>
          </React.Fragment>
        </div>
      </>
    );
  }

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("right", true)}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </Button>
        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer("right", false)}
            onKeyDown={toggleDrawer("right", false)}
          >
            <div className="mb-2 flex items-center gap-4 p-4">
              <img
                src="https://wd09-admin.cloud-workshop.online/uploads/_8072a878b4.png"
                alt="brand"
                className="h-10 w-10"
              />
              <p variant="h5" color="blue-gray">
                HighLearnHub
              </p>
            </div>
            <hr />
            <Link to={`/profile/${userData && userData.id}`}>
              <List>
                <ListItem disablePadding href="">
                  <ListItemButton>
                    {profileURL ? (
                      <img
                        className="object-cover w-6 h-6 rounded-full"
                        src={profileURL}
                        alt="proflie"
                      ></img>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <p className="ml-2">{userData.username}</p>
                    <svg
                      class="w-6 h-6 text-orange-400 dark:text-white"
                      style={{ marginLeft: "10px" }}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.6 3.2a1 1 0 0 0-1.6 1 3.5 3.5 0 0 1-.8 3.6c-.6.8-4 5.6-1 10.7A7.7 7.7 0 0 0 12 22a8 8 0 0 0 7-3.8 7.8 7.8 0 0 0 .6-6.5 8.7 8.7 0 0 0-2.6-4 1 1 0 0 0-1.6.7 10 10 0 0 1-.8 3.4 9.9 9.9 0 0 0-2.2-5.5A14.4 14.4 0 0 0 9 3.5l-.4-.3Z" />
                    </svg>
                    <p className="ml-2">{countStreak}</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
            <hr className="my-2 border-blue-gray-50" />
            <Link to="/home">
              <List>
                <ListItem disablePadding href="">
                  <ListItemButton>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
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
                    <p className="ml-2">หน้าแรก</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
            <Link to="/mycourse">
              <List>
                <ListItem disablePadding href="">
                  <ListItemButton>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-2">คอร์สของฉัน</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
            <Link to="/Mycart">
              <List>
                <ListItem disablePadding href="">
                  <ListItemButton>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4c0-.6.4-1 1-1h1.5c.5 0 .9.3 1 .8L7.9 6H19a1 1 0 0 1 1 1.2l-1.3 6a1 1 0 0 1-1 .8h-8l.2 1H17a3 3 0 1 1-2.8 2h-2.4a3 3 0 1 1-4-1.8L5.7 5H5a1 1 0 0 1-1-1Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="ml-2">ตะกร้าของฉัน</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
            <Link to="/history">
              <List>
                <ListItem disablePadding href="">
                  <ListItemButton>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 6h16v6H4v-6Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M5 14c0-.6.4-1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm5 0c0-.6.4-1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="ml-2">ประวัติการสั่งซื้อ</p>
                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
            <div className="absolute inset-x-0 bottom-0 h-16">
              <hr className="border-blue-gray-50" />
              <div className="flex items-center gap-4">
                <List>
                  <ListItem disablePadding href="">
                    <ListItemButton
                      style={{ width: "250px" }}
                      onClick={() => logout(true)}
                    >
                      <svg
                        className="w-6 h-6 text-red-700 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                        />
                      </svg>
                      <p className="ml-2 text-red-700">ออกจากระบบ</p>
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            </div>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
