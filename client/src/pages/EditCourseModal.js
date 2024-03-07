import { Box, Button, CircularProgress } from "@mui/material";
import { Label, Modal, Select, TextInput, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../context/Auth.context";
export default function EditCourseModal(props) {
  const [placeholder, setPlaceholder] = useState([{}]);
  const [editedCourse, setEditedCourse] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [onChangeImg, setOnChangeImg] = useState(null);
  const navigate = useNavigate();
  const [study_type, setStudy_type] = useState(
    props.course.attributes.study_type || null
  );
  const { loading, setLoading } = props;

  const handleChanged = (e) => {
    setEditedCourse((prevState) => ({
      ...prevState,
      attributes: { ...prevState.attributes, ...e },
    }));
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage[0]));
    }
  }, [selectedImage]);

  const uploadImg = async () => {
    const formData = new FormData();
    formData.append("field", "image");
    formData.append("ref", "api::course.course");
    formData.append("refId", props.course.id);
    formData.append("files", selectedImage[0]);

    ax.post(conf.apiUrlPrefix + `/upload`, formData)
      .then((response) => {
        setOnChangeImg(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSummit = (data) => {
    setLoading(true);
    if (selectedImage) {
      uploadImg(selectedImage);
    }
    ax.put(conf.apiUrlPrefix + `/courses/${props.course.id}?populate=*`, {
      data: data.attributes,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      navigate(`/course/${props.course.id}`);
      setLoading(false);
      props.onCloseModal(false);
    }, 1500);
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
            <Modal
              show={props.openModal}
              size="2xl"
              position={"center"}
              onClose={() => props.onCloseModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="space-y-6">
                  <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
                    แก้ไขข้อมูลคอร์ส
                  </h3>
                  <div className="flex items-center">
                    <div className="mr-3 w-24 text-right">
                      <Label htmlFor="courseTitle" value="ชื่อคอร์ส :" />
                    </div>
                    <TextInput
                      id="courseTitle"
                      placeholder={props.course.attributes.title}
                      value={placeholder.title}
                      onChange={(event) =>
                        handleChanged({ title: event.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 w-24 text-right">
                      <Label htmlFor="courseSubject" value="วิชา :" />
                    </div>
                    <Select
                      onChange={(event) =>
                        handleChanged({ subject: event.target.value })
                      }
                      id="courseSubject"
                      required
                    >
                      <option value="none" selected disabled hidden>
                        เลือกวิชา
                      </option>
                      <option value={"วิทยาศาสตร์"}>วิทยาศาสตร์</option>
                      <option value={"คณิตศาสตร์"}>คณิตศาสตร์</option>
                      <option value={"ภาษาอังกฤษ"}>ภาษาอังกฤษ</option>
                      <option value={"ภาษาไทย"}>ภาษาไทย</option>
                      <option value={"สังคมศึกษา"}>สังคมศึกษา</option>
                    </Select>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 w-24 text-right">
                      <Label htmlFor="courseTitle" value="ผู้สอน :" />
                    </div>
                    <TextInput
                      id="courseTitle"
                      placeholder={props.course.attributes.instructor_name}
                      value={placeholder.instructor_name}
                      onChange={(event) =>
                        handleChanged({ instructor_name: event.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 w-24 text-right">
                      <Label htmlFor="coursePrice" value="ราคา :" />
                    </div>
                    <TextInput
                      id="coursePrice"
                      placeholder={props.course.attributes.price}
                      value={placeholder.price}
                      onChange={(event) =>
                        handleChanged({ price: event.target.value })
                      }
                      required
                      className="w-14"
                    />
                    <span className="inline-block ml-2">บาท</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 ml-4 w-24 text-right">
                      <Label htmlFor="courseDescription" value="คำอธิบาย :" />
                    </div>
                    <Textarea
                      id="courseDescription"
                      onChange={(event) =>
                        handleChanged({ description: event.target.value })
                      }
                      placeholder={props.course.attributes.description}
                      value={placeholder.description}
                      required
                      rows={2}
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 ml-4 w-24 text-right">
                      <Label htmlFor="courseDetail" value="รายละเอียด :" />
                    </div>
                    <Textarea
                      id="courseDetail"
                      onChange={(event) =>
                        handleChanged({ detail: event.target.value })
                      }
                      placeholder={props.course.attributes.detail}
                      value={placeholder.detail}
                      required
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 w-24 text-right">
                      <Label htmlFor="courseStudyType" value="รูปแบบ :" />
                    </div>
                    <Select
                      onChange={(event) => {
                        handleChanged({ study_type: event.target.value });
                        setStudy_type(event.target.value);
                      }}
                      id="courseStudyType"
                      required
                      value={
                        study_type ||
                        props?.course?.attributes?.study_type ||
                        "none"
                      }
                    >
                      <option value="none" disabled hidden>
                        เลือกรูปแบบ
                      </option>
                      <option value="Online">ออนไลน์</option>
                      <option value="Live">สดออนไลน์</option>
                    </Select>
                  </div>
                  {props?.course?.attributes?.study_type &&
                    study_type === "Live" && (
                      <div className="flex flex-col mt-4">
                        <div className="flex items-center">
                          <div className="mr-3 w-24 text-right">
                            <Label htmlFor="maxAmount" value="นักเรียนเต็ม :" />
                          </div>
                          <TextInput
                            type="number"
                            id="maxAmount"
                            name="maxAmount"
                            onChange={(event) =>
                              handleChanged({ maxamount: event.target.value })
                            }
                            value={placeholder?.maxamount}
                            placeholder={props?.course?.attributes?.maxamount}
                          />
                        </div>
                        <div className="flex items-center mt-4">
                          <div className="mr-3 w-24 text-right">
                            <Label htmlFor="schedule_text" value="ช่วงเวลา :" />
                          </div>
                          <TextInput
                            type="text"
                            id="schedule_text"
                            name="schedule_text"
                            onChange={(event) =>
                              handleChanged({
                                schedule_text: event.target.value,
                              })
                            }
                            value={placeholder?.schedule_text}
                            placeholder={
                              props?.course?.attributes?.schedule_text
                            }
                          />
                        </div>
                      </div>
                    )}

                  <div className="flex">
                    <label
                      htmlFor="imageInput"
                      className="font-medium text-sm block ml-4 cursor-pointer"
                    >
                      รูปปกคอร์ส :
                    </label>
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedImage(e.target.files)}
                      className="ml-4"
                    />
                  </div>
                  <div>
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
                  <div className="flex justify-center gap-10">
                    <button
                      onClick={() => handleSummit(editedCourse)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      ยืนยัน
                    </button>
                    <button
                      onClick={() => handleSummit(editedCourse)}
                      className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
      </ContextProvider>
    </>
  );
}
