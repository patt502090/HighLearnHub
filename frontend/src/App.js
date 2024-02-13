import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Course from "./components/Course";
import SidebarWithBurgerMenu from "./components/Sidebar"

function App() {

  return (
    <>
      <Navbar />
      <Course />
      <Outlet />
      <SidebarWithBurgerMenu />
    </>
  );
}

export default App;
