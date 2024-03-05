import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import {
  Modal,
  Label,
  TextInput,
  Textarea,
  Button,
  Datepicker,
} from "flowbite-react";
import toast from "react-hot-toast";

const AdminFooterAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [footerData, setFooterData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editedBanner, setEditedBanner] = useState({
    attributes: {
      title: "",
      start_date: "",
      expiry_date: "",
      status: "",
    },
  });

  const handleUpdateBanner = async () => {
    try {
      const response = await ax.put(
        `${conf.apiUrlPrefix}/footer-announcements/1`,
        {
          data: {
            title: editedBanner.attributes.title,
            start_date: editedBanner.attributes.start_date,
            expiry_date: editedBanner.attributes.expiry_date,
            status: editedBanner.attributes.status,
          },
        }
      );
      console.log("Update สำเร็จ", response?.data);
      toast.success("แก้ไขสำเร็จ");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("เกิดข้อผิดพลาดในการแก้ไข");
    }
  };

  const handleChanged = (e) => {
    setEditedBanner((prevState) => ({
      ...prevState,
      attributes: { ...prevState.attributes, ...e },
    }));
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const responseStreak = await ax.get(
          `${conf.apiUrlPrefix}/footer-announcements`
        );
        setFooterData(responseStreak?.data?.data[0]?.attributes);
      } catch (error) {
        console.error("Error fetching footer :", error);
      }
    };

    fetchFooterData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          `${conf.apiUrlPrefix}/footer-announcements/1`
        );
        if (response?.data) {
          setEditedBanner({
            attributes: {
              title: response.data.data.attributes.title,
              start_date: response.data.data.attributes.start_date,
              expiry_date: response.data.data.attributes.expiry_date,
              status: response.data.data.attributes.status,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isModalOpen]);

  return (
    <>
     {isVisible &&
      (
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-3 sm:px-3.5 before:flex-1 mt-16 z-9999">
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          ></div>
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          ></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">HighLearnHub</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx="1" cy="1" r="1" />
            </svg>
            {footerData.title}
          </p>
          <a
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 cursor-pointer"
            onClick={handleEditClick}
          >
            แก้ไขประกาศ <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="flex flex-1 justify-start">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px] "
            onClick={handleDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-5 w-5 text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div> )}
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="bg-white p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={editedBanner.attributes.status === "enable"}
                  className="sr-only peer"
                  checked={editedBanner.attributes.status === "enable"}
                  onChange={(event) =>
                    handleChanged({
                      status: event.target.checked ? "enable" : "disable",
                    })
                  }
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {editedBanner.attributes.status === "enable"
                    ? "Enable"
                    : "Disable"}
                </span>
              </label>
              <Label
                htmlFor="TitleBanner"
                value="ประกาศ : "
                className="w-24 text-center"
              />
              <div className="flex-grow">
                <Textarea
                  id="TitleBanner"
                  value={editedBanner.attributes.title}
                  onChange={(event) =>
                    handleChanged({ title: event.target.value })
                  }
                  placeholder="ประกาศ"
                  required
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <Label
                htmlFor="StartDate"
                value="วันเริ่มต้น : "
                className="w-24 text-center"
              />
              <div className="flex-grow">
                <Textarea
                  id="StartDate"
                  value={editedBanner.attributes.start_date}
                  onChange={(event) =>
                    handleChanged({
                      start_date: event.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <Label
                htmlFor="ExpiryDate"
                value="วันสิ้นสุด : "
                className="w-24 text-center"
              />
              <div className="flex-grow">
                <Textarea
                  id="ExpiryDate"
                  value={editedBanner.attributes.expiry_date}
                  onChange={(event) =>
                    handleChanged({
                      expiry_date: event.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                gradientDuoTone="purpleToBlue"
                className="px-5"
                onClick={handleUpdateBanner}
              >
                Submit
              </Button>
              <Button
                gradientDuoTone="pinkToOrange"
                onClick={() => setIsModalOpen(false)}
              >
                Close Modal
              </Button>
            </div>
          </div>
        </Modal>
                )}
    </>
  );
};

export default AdminFooterAnnouncement;
