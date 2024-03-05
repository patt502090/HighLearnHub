import { Label, Select, TextInput, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../context/Auth.context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AddAnnouncementPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [onChangeImg, setOnChangeImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    Describtion: "",
    expiry_date: null,
    courses: [], // Add courseIds to initial state
    discount: "",
  });
  
  const [dataofcourses, setDataofcourses] = useState([]); // Ensure it's initialized as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(`${conf.apiUrlPrefix}/courses?populate=announcement`);
        console.log("response =", response.data);
        if (Array.isArray(response.data.data)) {
          // Filter the data where announcement is not null
          const filteredData = response.data.data.filter(item => item.attributes.announcement.data === null);
          console.log("Filtered data:", filteredData);
          // Update state with the filtered data
          setDataofcourses(filteredData);
        } else {
          console.error("Error: Response data is not an array");
        }
        if (selectedImage) {
          setImageUrl(URL.createObjectURL(selectedImage[0]));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subject') {
      setCourseData((prevState) => ({ ...prevState, courses: [value] }));
      
    }
    else if (name === 'discount') {
      // ตรวจสอบว่าค่าที่รับเข้ามาไม่น้อยกว่า 1
      if (parseInt(value) >= 1) {
        setCourseData((prevState) => ({ ...prevState, [name]: value }));
      }}
    else {
      setCourseData((prevState) => ({ ...prevState, [name]: value }));
    }

  };


  const handleDateChange = (date) => {
    setCourseData((prevState) => ({ ...prevState, expiry_date: date }));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const updatedCourseIds = [...courseData.courses];

    if (updatedCourseIds.includes(value)) {
      // Remove from state if already selected
      const index = updatedCourseIds.indexOf(value);
      updatedCourseIds.splice(index, 1);
    } else {
      // Add to state if not already selected
      updatedCourseIds.push(value);
    }

    // Update the state
    setCourseData((prevState) => ({
      ...prevState,
      courses: updatedCourseIds,
    }));
  };

  const uploadImg = async (e) => {
    const formData = new FormData();

    formData.append("field", "image");
    formData.append("ref", "api::announcement.announcement");
    formData.append("refId", parseInt(e));
    formData.append("files", selectedImage[0]);

    try {
      const response = await ax.post(conf.apiUrlPrefix + `/upload`, formData);
      setOnChangeImg(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!courseData.title || !courseData.Describtion || !courseData.expiry_date || courseData.courses.length === 0) {
        alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
        return;
      }
      setLoading(true);
      const response = await ax.post(`${conf.apiUrlPrefix}/announcements`, {
        data: {
          title:courseData.title,
          expiry_date:courseData.expiry_date,
          Describtion:courseData.Describtion,
          courses: courseData.courses?.map(id => parseInt(id)), // แปลงค่าทุกค่าในอาเรย์เป็น Int
        },
      });
      for (const id of courseData.courses) {
        await ax.put(conf.apiUrlPrefix + `/courses/${id}`, {
          data: {
            discount: parseInt(courseData.discount),
          },
        });
      }

      console.log(courseData);
      uploadImg(response.data.data.id);
      setTimeout(() => {
        navigate("/admin");
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <>
      <ContextProvider>
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
                    เพิ่มประกาศ
                  </h3>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" value="หัวข้อประกาศ" />
                      <TextInput
                        id="title"
                        name="title"
                        placeholder="หัวข้อประกาศ"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="indent-2 mt-">
                    <label className="indent-12 mt-2" htmlFor="courses">รายการคอร์ส</label>
                      {console.log("fffff", courseData.courses)}
                      {dataofcourses.map((course) => (
                        <div key={course.id} className="flex items-center mb-4">
                          <input
                            id={`course-${course.id}`}
                            type="checkbox"
                            value={course.id}
                            checked={courseData.courses.includes(course.id)}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label
                            htmlFor={`course-${course.id}`}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {course.attributes.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  {console.log("discount = ",courseData.discount)}
                  <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ส่วนลด%" value="ส่วนลด%" />
                    <TextInput
                      id="discount"
                      name="discount"
                      placeholder="discount"
                      type="number"
                      min="0"
                      value={courseData.discount}
                      onChange={handleChange}
                      required
                    />
                  </div>
</div>

                    <div>
                      {console.log("date:", courseData.expiry_date)}
                      <label htmlFor="expiry_date">วันที่หมดอายุ:</label>
                      <DatePicker
                        id="expiry_date"
                        selected={courseData.expiry_date}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy" // Specify the date format
                        isClearable // Enable clearing the date
                        placeholderText="เลือกวันที่"
                      />
                    </div>
                    {console.log("sgsdd",courseData.Describtion)}
                    <div className="lg:col-span-2">
                      <Label htmlFor="describtion" value="คำอธิบาย" />
                      <Textarea
                        id="describtion"
                        name="Describtion"
                        placeholder="คำอธิบาย"
                        defaultValue={courseData.Describtion}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <div>
                        <label
                          htmlFor="imageInput"
                          className="font-medium text-sm block mb-1 cursor-pointer"
                        >
                          รูปประกาศ
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
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      เพิ่มประกาศ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </ContextProvider>
    </>
  );
}
