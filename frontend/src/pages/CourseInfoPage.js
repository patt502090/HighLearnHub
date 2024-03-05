import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BasicTabs from "../components/Tabs";
import CircularProgress from "@mui/material/CircularProgress";
import EditCourseModal from "./EditCourseModal";
import conf from "../conf/main";
import ax from "../conf/ax";
import { Button, Modal } from "flowbite-react";
import { IoTrashBin, IoSettingsOutline } from "react-icons/io5";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { Helmet } from "react-helmet";
import { ContextProvider } from "../context/Auth.context";
export default function CourseInfoPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { state: ContextState } = useContext(AuthContext);
  const { userRole } = ContextState;
  const [onEdit, setOnEdit] = useState(false);
  const [Infouser, setInfouser] = useState();
  const [own, setOwn] = useState(false);
  const [ownCourseDisplay, setOwnCourseDisplay] = useState();
  const [onEdition, setOnEdition] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourse(); //still bug react return before img fetch finish
  }, [onEdit]);

  useEffect(() => {
    fetchCourse();
    checkIfUserHaveBooking();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await ax.get(
        conf.apiUrlPrefix + `/courses/${id}?populate=*`
      );
      setCourse(response.data.data);
      setLoading(false);
      const datauser = await ax.get(conf.apiUrlPrefix + `/users/me`);
      setInfouser(datauser.data.id);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const checkIfUserHaveBooking = async () => {
    try {
      const response = await ax.get(
        conf.apiUrlPrefix + `/alreadyHaveBooking/${id}`
      );
      setOwn(response.data[0]);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    ax.delete(conf.apiUrlPrefix + `/courses/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setShowDeleteModal(false);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 600);
  };

  const handleManageVideoPage = (id) => {
    navigate(`/manage-video/${id}`);
  };

  useEffect(() => {
    console.log("dfgsgs ", own);
    if (own) {
      if (own.payment_status === true) {
        setOwnCourseDisplay(
          <Link to={"/mycourse"}>
            <button className="px-10 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              คุณมีคอร์สนี้แล้ว
            </button>
          </Link>
        );
      } else {
        setOwnCourseDisplay(
          <Link to={"/mycart"}>
            <button className="px-10 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
              คอร์สอยู่ในตะกร้าแล้ว
            </button>
          </Link>
        );
      }
    } else {
      setOwnCourseDisplay(
        <Link to={"/mycart"}>
          <button
            className="px-14 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={() => Addcart()}
          >
            เพิ่มเข้าตะกร้า
          </button>
        </Link>
      );
    }
  }, [course]);

  const Addcart = async (course) => {
    try {
      const bookedDate = new Date(); // สร้างวันที่และเวลาปัจจุบัน

      // แยกระหว่างวันที่และเวลา
      const date = bookedDate.toISOString().split("T")[0]; // แยกวันที่ (อันดับแรกของ ISO string)
      const time = bookedDate.toISOString().split("T")[1].split(".")[0]; // แยกเวลา (อันดับสองของ ISO string)

      // สร้างวันหมดอายุโดยเพิ่ม 3 วันลงไปจาก booked_date
      const expiryDate = new Date(bookedDate);
      expiryDate.setDate(expiryDate.getDate() + 3);
      const expiryDateString = expiryDate.toISOString().split("T")[0]; // แยกวันที่ออกมา

      const response = await ax.post(conf.apiUrlPrefix + `/createBooking`, {
        data: {
          booked_date: `${date} ${time}`,
          expiry_date: `${expiryDateString} ${time}`, // ใช้วันที่หมดอายุที่ถูกปรับแล้ว
          course: parseInt(id),
          publishedAt: new Date(),
        },
      });
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  if (loading) {
    return (
      <div className="background-image">
        <div className="h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (userRole === "admin") {
    return (
      <div className="background-image">
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>รายละเอียดคอร์ส</title>
        </Helmet>
        {onEdit ? (
          <EditCourseModal
            course={course}
            openModal={onEdit}
            onCloseModal={setOnEdit}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <></>
        )}
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 pt-24 text-center">
          {course ? (
            <div className="bg-white shadow-md rounded-md p-6">
              {course.attributes.image && (
                <img
                  src={`http://localhost:1337${course.attributes.image.data.attributes.url}`}
                  alt={course.attributes.title}
                  className="w-full h-auto mb-6 rounded-md"
                />
              )}
              <h1 className="mb-4 text-2xl font-bold">
                {course.attributes.title}
              </h1>
              <BasicTabs
                data={course}
                OnDelete={setShowDeleteModal}
                OnEdition={setOnEdition}
              />
              {course.attributes.discount !== 1 ? (
                <p className="text-md text-center font-bold text-red-700 sm:text-2xl mb-4">
                  <p className="text-gray-500 line-through">
                    {course.attributes.price} บาท
                  </p>
                  <p className="text-red-500 font-semibold">
                    {course.attributes.price *
                      ((100 - course.attributes.discount) / 100)}{" "}
                    บาท
                  </p>
                </p>
              ) : (
                <p className="text-md text-center font-bold text-grey-1000 sm:text-2xl mb-4">
                  <span class="text-3xl font-bold text-slate-900">
                    {course.attributes.price} บาท{" "}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <div className="h-screen flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </div>
        <Modal
          show={showDeleteModal}
          size="md"
          onClose={() => setShowDeleteModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <IoTrashBin className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ต้องการลบข้อมูลคอร์สนี้ออกจากระบบ ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => deleteCourse(id)}>
                  ตกลง
                </Button>
                <Button
                  color="gray"
                  className="px-6"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div>
          <Modal
            show={onEdition}
            size="md"
            onClose={() => setOnEdition(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiMiniWrenchScrewdriver className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  การแก้ไขข้อมูลของคอร์ส
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    gradientDuoTone="pinkToOrange"
                    className="mt-4 w-full mx-auto"
                    onClick={() => handleManageVideoPage(course.id)}
                  >
                    วิดีโอและบทเรียน
                  </Button>
                  <Button
                    gradientDuoTone="pinkToOrange"
                    className="mt-4 w-full mx-auto"
                    onClick={() => {
                      setOnEdit(true);
                      setOnEdition(false);
                    }}
                  >
                    รายละเอียดคอร์ส
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }

  return (
    <ContextProvider>
      <div className="background-image">
        <Navbar />
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>รายละเอียดคอร์ส</title>
        </Helmet>
        <div className="max-w-4xl mx-auto p-6 pt-24 text-center">
          {course ? (
            <div className="bg-white shadow-md rounded-md p-6">
              {course.attributes.image && (
                <img
                  src={`${conf.urlPrefix}${course.attributes.image.data.attributes.url}`}
                  alt={course.attributes.title}
                  className="w-full h-auto mb-6 rounded-md"
                />
              )}
              <h1 className="mb-4 text-2xl font-bold">
                {course.attributes.title}
              </h1>
              <BasicTabs data={course} />

              <p className="text-md sm:text-lg font-normal sm:font-medium mb-4">
                {course.attributes.description}
              </p>
              {console.log("gay", course.attributes.discount)}
              {course.attributes.discount !== 1 ? (
                <p className="text-md text-center font-bold text-red-700 sm:text-2xl mb-4">
                  <p className="text-gray-500 line-through">
                    {course.attributes.price} บาท
                  </p>
                  <p className="text-red-500 font-semibold">
                    {Math.round(
                      course.attributes.price *
                        ((100 - course.attributes.discount) / 100)
                    )}{" "}
                    บาท
                  </p>
                </p>
              ) : (
                <p className="text-md text-center font-bold text-grey-1000 sm:text-2xl mb-4">
                  <span class="text-3xl font-bold text-slate-900">
                    {course.attributes.price} บาท{" "}
                  </span>
                </p>
              )}
              <div className=" items-center">
                <div>{ownCourseDisplay}</div>
              </div>
            </div>
          ) : (
            <div className="h-screen flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </ContextProvider>
  );
}
