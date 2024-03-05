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
import VideoPage from "./pages/VideoPage";
import ProtectAdminRoute from "./conf/ProtectRoute";
import ProtectMemberRoute from "./conf/ProtectMemberRoute";
import LoginRedirect from "./pages/LoginRedirect";
import ApprovePaymentPage from "./pages/ApprovePaymentPage";
import AddCoursePage from "./pages/AddCoursePage";
import ManageVideoPage from "./pages/ManageVideoPage"
import Dashboard from "./pages/Dashboard";
import ListUserPage from "./pages/ListUserPage";
import EventPage from "./pages/EventPage";
import PromotionPage from "./pages/PromotionPage";
import CourseControlPanelPage from "./pages/CourseControlPanelPage";
import AddAnnouncementPage from "./pages/AddAnnouncementPage";
import FilterSubjectPage from "./pages/FilterSubjectPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<App />} />
          <Route path="/course/:id" element={<CourseInfoPage />} />
          <Route path="/course/filters/:id" element={<FilterSubjectPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registerAccount" element={<RegisterAccountPage />} />
          <Route path="/admin" element={<ProtectAdminRoute><App /></ProtectAdminRoute>} />
          <Route path="/admin/:id" element={
            <ProtectAdminRoute><CourseInfoPage /></ProtectAdminRoute>} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/payment" element={<ProtectMemberRoute><PaymentPage /></ProtectMemberRoute>} />
          <Route path="/MyCart" element={<ProtectMemberRoute><CartPage /></ProtectMemberRoute>} />
          <Route path="/mycourse" element={<ProtectMemberRoute><MyCoursePage /></ProtectMemberRoute>} />
          <Route path="/history" element={<ProtectMemberRoute><HistoryPage /></ProtectMemberRoute>} />
          <Route path="/finishpayment" element={<ProtectMemberRoute><FinishPaymentPage /></ProtectMemberRoute> }/>
          <Route path="/mycourse/:id" element={<ProtectMemberRoute><VideoPage /></ProtectMemberRoute>} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/promotion" element={<PromotionPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/connect/google/redirect" element={<LoginRedirect />} />
          <Route path="/admin/approve" element={<ProtectAdminRoute><ApprovePaymentPage /></ProtectAdminRoute>} />
          <Route path="/admin/course/:ownerId" element={<ProtectAdminRoute><CourseControlPanelPage /></ProtectAdminRoute>} />
          <Route path="/admin/addcourse" element={<ProtectAdminRoute><AddCoursePage /></ProtectAdminRoute>} />
          <Route path="/admin/userlist" element={<ProtectAdminRoute><ListUserPage /></ProtectAdminRoute>} />
          <Route path="/manage-video/:id" element={<ProtectAdminRoute><ManageVideoPage /></ProtectAdminRoute>} />
          <Route path="/admin/dashboard" element={<ProtectAdminRoute><Dashboard /></ProtectAdminRoute>} />
          <Route path="/admin/addAnnouncement" element={<ProtectAdminRoute><AddAnnouncementPage /></ProtectAdminRoute>} />
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
