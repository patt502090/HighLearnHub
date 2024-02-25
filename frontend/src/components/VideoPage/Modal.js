import { Button, Modal as FlowbiteModal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Modal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/MyCourse");
  };

  return (
    <>
      <FlowbiteModal show={isOpen} size="md" onClose={onClose} popup>
        <FlowbiteModal.Header />
        <FlowbiteModal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-5 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-3 text-2xl font-bold ">ออกจากห้องเรียน</h3>
            <h3 className="mb-6 text-lg font-normal text-slate-500">
              คุณต้องการออกจากห้องเรียนใช่หรือไม่
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="white"
                onClick={onClose}
                className="px-3 text-yellow-500"
              >
                เรียนต่อ
              </Button>
              <Button color="warning" onClick={handleBack} className="px-6">
                ออก
              </Button>
            </div>
          </div>
        </FlowbiteModal.Body>
      </FlowbiteModal>
    </>
  );
}

export default Modal;
