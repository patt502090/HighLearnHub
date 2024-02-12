import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CourseInfoPage from './pages/CourseInfoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { ContextProvider } from "./context/Auth.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "home",
        element: <CourseInfoPage />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/member",
    element: <App/>,
    children: [
      {
        path: "/member/:id",
        element: <CourseInfoPage />,
      },
    ]
  },
  {
    path: "/admin",
    element: <App/>,
    children: [
      {
        path: "/admin/:id",
        element: <CourseInfoPage />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
      </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
