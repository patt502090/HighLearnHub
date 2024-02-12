import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Button } from "flowbite-react";
import Navbar from "./pages/navbar";

function App() {
  return (
    <>
      <Navbar> </Navbar>
      <Outlet />
    </>
  );
}

export default App;
