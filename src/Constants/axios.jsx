import axios from "axios";
import React, { useState, useEffect } from "react";
import NotificationDialog from "./DialogueAlert";
import { Navigate } from "react-router-dom";

export const axiosUserInstance = axios.create({
  baseURL: `http://localhost:4000`,
});
export const axiosAdminInstance = axios.create({
  baseURL: `http://localhost:4000/admin`,
});
export const axiosManagerInstance = axios.create({
  baseURL: `http://localhost:4000/manager`,
});
axiosAdminInstance.interceptors.response.use(
  (response) => {
    console.log(response, "fdgf");
    return response;
  },
  (error) => {
    console.log("hj");
    if (error.response.data.message === "user expired") {
      localStorage.removeItem("adminInfo");
      window.location.href = '/admin/login';
      NotificationDialog();
    }
    console.log(error.response.data.message);
    return Promise.reject(error);
  }
);
axiosUserInstance.interceptors.response.use(
  (response) => {
    if(response.data.message=='user blocked'){
      localStorage.removeItem("userInfo");
      window.location.href = '/login';
    }
    console.log(response, "fdgf");
    return response;
  },
  (error) => {
    console.log("hj");
    if (error.response.data.message === "user expired"||error.response.data.message ==='user blocked') {
      localStorage.removeItem("userInfo");
      window.location.href = '/login';
      NotificationDialog();
    }
    console.log(error.response.data.message);
    return Promise.reject(error);
  }
);
axiosManagerInstance.interceptors.response.use(
  (response) => {
    console.log(response, "fdgf");
    return response;
  },
  (error) => {
    console.log("hj");
    if (error.response.data.message === "user expired") {
      localStorage.removeItem("managerInfo");
      window.location.href = '/manager/login';
      NotificationDialog();
    }
    console.log(error.response.data.message);
    return Promise.reject(error);
  }
);

function YourComponent() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");

    if (!adminInfo) {
      handleOpen();
    }
  }, []);

  return (
    <div>
      <button>Remove Admin Info</button>
      {open && <NotificationDialog />}
    </div>
  );
}
