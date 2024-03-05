import React from "react";
import { Button } from "flowbite-react";

const Footer = ({ onLeaveRoom }) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-slate-400 text-white p-3 flex justify-start items-center">
      <Button
        gradientDuoTone="pinkToOrange"
        onClick={onLeaveRoom}
        className="ml-1 sm:ml-3 hover:underline"
      >
        ออกจากห้องเรียน
      </Button>
    </footer>
  );
};

export default Footer;
