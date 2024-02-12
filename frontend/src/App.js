import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Button } from "flowbite-react";
import Navbar from "./pages/navbar";
import Course from "./componant/course";

function App() {
  return (
    <>
      <Navbar> </Navbar>
      <Course/>
      
      <Outlet />
    </>
  );
}

export default App;
