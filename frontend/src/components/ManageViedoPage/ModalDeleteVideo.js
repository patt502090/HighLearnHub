import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';
const ModalDelete = ({ isOpen, onClose, onDelete, videoTitle }) => {
    return (
        <>
          <Modal show={isOpen} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                คุณต้องการลบวิดีโอ "{videoTitle}" ใช่หรือไม่?
                </h3>
                <p className='text-sm'>การดำเนินการนี้จะลบวิดีโอถาวร คุณแน่ใจหรือไม่ว่าต้องการดำเนินการนี้?</p>
                <div className="flex justify-center gap-4 mt-7">
                  <Button color="failure" onClick={onDelete} className='px-4'>
                    ลบ
                  </Button>
                  <Button color="gray" onClick={onClose} className='px-1'>
                  ยกเลิก
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      );
    }

export default ModalDelete;
