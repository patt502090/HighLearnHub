import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="background-image">
        <HomePage />
        <Outlet />
      </div>
    </>
  );
}

export default App;
