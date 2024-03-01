import { Label, Select, TextInput, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function AddCoursePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [onChangeImg, setOnChangeImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    subject: "",
    instructor_name: "",
    price: "",
    description: "",
    detail: "",
    study_type: "",
    maxamount: null,
    schedule_text: null,
  });
  console.log("courseData",courseData)

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage[0]));
    }
  }, [selectedImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({ ...prevState, [name]: value }));
  };

  const uploadImg = async (e) => {
    const formData = new FormData();

    formData.append("field", "image");
    formData.append("ref", "api::course.course");
    formData.append("refId", e);
    formData.append("files", selectedImage[0]);

    ax.post(conf.apiUrlPrefix + `/upload`, formData)
      .then((response) => {
        setOnChangeImg(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubmit = async () => {
    try {
      if (
        !courseData.title ||
        !courseData.subject ||
        !courseData.instructor_name ||
        !courseData.price ||
        !courseData.description ||
        !courseData.detail ||
        !courseData.study_type ||
        (courseData.study_type === "Live" &&
          (!courseData.maxamount || !courseData.schedule_text))
      ) {
        alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
        return; 
      }
  
      setLoading(true);
      const response = await ax.post(`${conf.apiUrlPrefix}/courses`, {
        data: courseData,
      });
      console.log(courseData);
      uploadImg(response.data.data.id);
      setTimeout(() => {
        navigate("/admin");
        setLoading(false);
      },500);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  

  return (
    <>
      {loading ? (
        <div className="background-image">
          <div className="h-screen flex justify-center items-center">
            <CircularProgress />
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="pt-24 h-screen md:h-screen background-image">
            <div className="mx-10 lg:mx-auto flex flex-col items-center justify-items-center w-auto sm:w-full">
              <div className="mt-4 w-full xl:w-2/3 2xl:w-1/2 p-8 sm:p-16 2xl:p-12 bg-white shadow-lg rounded-lg ">
                <h3 className="text-2xl text-center font-medium text-gray-900 dark:text-white mb-6">
                  เพิ่มคอร์ส
                </h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" value="ชื่อคอร์ส" />
                    <TextInput
                      id="title"
                      name="title"
                      placeholder="ชื่อคอร์ส"
                      value={courseData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" value="วิชา" />
                    <Select
                      id="subject"
                      name="subject"
                      value={courseData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled hidden>
                        เลือกวิชา
                      </option>
                      <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
                      <option value="คณิตศาสตร์">คณิตศาสตร์</option>
                      <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
                      <option value="ภาษาไทย">ภาษาไทย</option>
                      <option value="สังคมศึกษา">สังคมศึกษา</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="instructor_name" value="ชื่อผู้สอน" />
                    <TextInput
                      id="instructor_name"
                      name="instructor_name"
                      placeholder="ชื่อผู้สอน"
                      value={courseData.instructor_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" value="ราคา" />
                    <TextInput
                      id="price"
                      name="price"
                      placeholder="ราคา"
                      type="number"
                      min="0"
                      value={courseData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <Label htmlFor="description" value="คำอธิบาย" />
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="คำอธิบาย"
                      value={courseData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <Label htmlFor="detail" value="บทเรียน" />
                    <Textarea
                      id="detail"
                      name="detail"
                      placeholder="รายละเอียด"
                      value={courseData.detail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="study_type" value="รูปแบบการเรียน" />
                    <Select
                      id="study_type"
                      name="study_type"
                      value={courseData.study_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled hidden>
                        เลือกรูปแบบการเรียน
                      </option>
                      <option value="Online">ออนไลน์</option>
                      <option value="Live">สดออนไลน์</option>
                    </Select>
                  </div>
                  {courseData.study_type === "Live" ? (
                    <div>
                      <Label htmlFor="maxamount" value="รับนักเรียนจำนวน" />
                      <TextInput
                        id="maxamount"
                        name="maxamount"
                        placeholder="จำนวน"
                        type="number"
                        min="0"
                        value={courseData.maxamount}
                        onChange={handleChange}
                        required
                      />
                      <Label htmlFor="schedule_text" value="ระยะเวลาเรียน" />
                      <TextInput
                        id="schedule_text"
                        name="schedule_text"
                        placeholder="ช่วงวันที่"
                        type="text"
                        value={courseData.schedule_text}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="mt-4">
                  <div>
                    <div>
                      <label
                        htmlFor="imageInput"
                        className="font-medium text-sm block mb-1 cursor-pointer"
                      >
                        รูปปกคอร์ส
                      </label>
                      <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files)}
                        className="rounded-lg"
                      />
                    </div>
                    {imageUrl && selectedImage && (
                      <Box mt={2} textAlign="center">
                        <img
                          src={imageUrl}
                          alt={selectedImage.name}
                          height="50px"
                        />
                      </Box>
                    )}
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    เพิ่มคอร์ส
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
