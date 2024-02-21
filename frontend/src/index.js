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
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import MyCoursePage from "./pages/MyCoursePage";
import HistoryPage from "./pages/HistoryPage";
import FinishPaymentPage from "./pages/FinishPaymentPage";


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
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/MyCart" element={<CartPage/>}/>
          <Route path="/mycourse" element={<MyCoursePage/>} />
          <Route path="/history" element={<HistoryPage/>} />
          <Route path="/finishpayment" element={<FinishPaymentPage/>} />
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
