import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Progessbar from "../components/Progessbar";
import backgroundImage from "../assets/background.png";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Helmet } from "react-helmet";
import { Modal, Button } from "flowbite-react";
import { RiErrorWarningLine } from "react-icons/ri";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { ContextProvider } from "../context/Auth.context";

export default function PaymentPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataId, setDataId] = useState();
  const [showmodal, setShowmodal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
            "/users/me?populate[bookings][filters][payment_status][$eq]=false"
        );
        console.log(response);
        const onlyId = response.data.bookings.map((item) => ({
          bookingId: item.id,
          userId: response.data.id,
        }));
        setDataId(onlyId);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(dataId);

  const Createorder = async () => {
    try {
      const bookingIds = dataId.map((item) => item.bookingId);
      const userIds = dataId.map((item) => item.userId);
      console.log("Idbooking", bookingIds);
      console.log("Idbooking", userIds);

      for (const id of bookingIds) {
        await ax.put(conf.apiUrlPrefix + `/bookings/${id}`, {
          data: {
            status: "process",
          },
        });
      }

      const PostData = await ax.post(conf.apiUrlPrefix + `/orders`, {
        data: {
          user: userIds[0],
          bookings: bookingIds,
          payment_date: new Date(),
        },
      });

      const formData = new FormData();

      formData.append("field", "confirmation");
      formData.append("ref", "api::order.order");
      formData.append("refId", PostData.data.data.id);
      formData.append("files", selectedFile);

      ax.post(conf.apiUrlPrefix + `/upload`, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const openFile = () => {
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      window.open(fileURL);
    } else {
      alert("โปรดเลือกไฟล์ก่อน");
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  const handlePaymentConfirmation = () => {
    localStorage.setItem("paymentSlip", selectedFile);
    Createorder();
  };

  return (
    <>
      <ContextProvider>
        <div className="background-image">
          <Navbar />
          <Progessbar></Progessbar>
          <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>ดำเนินการชำระเงิน</title>
          </Helmet>
          <div className="flex flex-col items-center mt-6">
            <h2 className="text-xl font-bold">หน้าชำระเงิน</h2>
            <section className="mt-6 py-17 bg-gray-100 font-poppins dark:bg-gray-700">
              <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
                <div>
                  <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 border-gray-800 rounded-md">
                    <div className="flex flex-col md:flex-row items-center justify-center mb-6 -mx-4 md:flex md:mb-8">
                      <div className="md:w-1/2 p-4">
                        <img
                          src="https://ตลับหมึกปริ้นเตอร์.com/sites/2110/files/s/articles/o_1bo96me2d2s61gg01vq1g5kkrk7.jpg"
                          alt="Thai Bank"
                          className="h-48 w-auto mx-auto"
                        />
                      </div>
                      <div className="md:w-1/2 p-4">
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-xl font-semibold text-center mt-2">
                            ธนาคารไทยพาณิชย์
                          </p>
                          <p className="text-lg text-center">
                            ชื่อบัญชี: Jone Doe
                          </p>
                          <p className="text-lg text-center">
                            หมายเลขบัญชี: 123-4-56789-0
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center mb-6 -mx-4 md:flex md:mb-8">
                      <div className="md:w-1/2 p-4">
                        <img
                          src="https://mpics.mgronline.com/pics/Images/566000003112201.JPEG"
                          alt="Thai Bank"
                          className="h-48 w-auto mx-auto"
                        />
                      </div>
                      <div className="md:w-1/2 p-4">
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-xl font-semibold text-center mt-2">
                            ธนาคารไทยกรุงไทย
                          </p>
                          <p className="text-lg text-center">
                            ชื่อบัญชี: Jone Doe
                          </p>
                          <p className="text-lg text-center">
                            หมายเลขบัญชี: 123-4-56789-0
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="py-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:mr-4"
              >
                อัปโหลดสลิปรูปภาพ
              </label>
              {selectedFile && (
                <>
                  <button
                    onClick={openFile}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:mr-4"
                  >
                    ดูไฟล์
                  </button>
                  <button
                    onClick={handleFileDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:mr-4"
                  >
                    ลบไฟล์
                  </button>
                </>
              )}

              <button
                onClick={() => setShowmodal(true)}
                disabled={selectedFile == null}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0 md:ml-4"
              >
                ดำเนินการต่อ
              </button>
            </div>
            <Modal
              show={showmodal}
              size="md"
              onClose={() => setShowmodal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <RiErrorWarningLine className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    โปรดตรวจสอบสลีปก่อนกดยืนยันการชำระเงิน
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Link
                      to={{
                        pathname: "/finishpayment",
                      }}
                    >
                      <Button
                        gradientMonochrome="success"
                        onClick={() => handlePaymentConfirmation()}
                      >
                        ยืนยันการชำระเงิน
                      </Button>
                    </Link>
                    <Button
                      color="gray"
                      className="px-6"
                      onClick={() => setShowmodal(false)}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </ContextProvider>
    </>
  );
}
