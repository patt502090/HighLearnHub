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
import PaymentPage from "./pages/PaymentPage";
import { ContextProvider } from "./context/Auth.context";
import PageNotFound from "./pages/PageNotFound";
import ProfliePage from "./pages/ProfliePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/course/:id" element={<CourseInfoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registerAccount" element={<RegisterAccountPage />} />
          <Route path="/member/:id" element={<CourseInfoPage />} />
          <Route path="/admin/:id" element={<CourseInfoPage />} />
          <Route path="/proflie" element={<ProfliePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
