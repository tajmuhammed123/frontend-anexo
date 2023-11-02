import axios from "axios";
import { useState, useEffect } from "react";
import NotificationDialog from "./DialogueAlert";

export const axiosUserInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_ROUTE,
});
export const axiosAdminInstance = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_ROUTE,
});
export const axiosManagerInstance = axios.create({
  baseURL: import.meta.env.VITE_MANAGER_ROUTE,
});
axiosAdminInstance.interceptors.response.use(
  (response) => {
    console.log(response, "fdgf");
    return response;
  },
  (error) => {
    if (error.response.data.message === "user expired") {
      localStorage.removeItem("adminInfo");
      window.location.href = "/admin/login";
      NotificationDialog();
    }
    console.log(error.response.data.message);
    return Promise.reject(error);
  }
);
axiosUserInstance.interceptors.response.use(
  (response) => {
    if (response.data.message == "user blocked") {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }
    return response;
  },
  (error) => {
    if (
      error.response.data.message === "user expired" ||
      error.response.data.message === "user blocked"
    ) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
      NotificationDialog();
    }
    console.log(error.response.data.message);
    return Promise.reject(error);
  }
);
axiosManagerInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.message === "user expired") {
      localStorage.removeItem("managerInfo");
      window.location.href = "/manager/login";
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
