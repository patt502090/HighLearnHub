import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Course from "./components/course";
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Navbar/>
      <Toaster position="top-right" reverseOrder={false} />
      <Course/>
      <Outlet />
    </>
  );
}

export default App;
