import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./pages/navbar";
import Course from "./componant/course";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Navbar> </Navbar>
      <Toaster position="top-right" reverseOrder={false} />
      <Course/>
      <Outlet />
    </>
  );
}

export default App;
