import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseInfoPage from "./pages/CourseInfoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterAccountPage from "./pages/RegisterAccountPage";

import { ContextProvider } from "./context/Auth.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/home" element={<CourseInfoPage />} /> */}
          <Route path="/course/:id" element={<CourseInfoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registerAccount" element={<RegisterAccountPage />} />
          <Route path="/member/:id" element={<CourseInfoPage />} />
          <Route path="/admin/:id" element={<CourseInfoPage />} />
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
