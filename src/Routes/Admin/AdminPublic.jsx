import { Navigate, Outlet } from "react-router-dom";

function adminPublic(props) {
  if (localStorage.getItem("adminInfo")) {
    return <Navigate to="/admin/" />;
  }
  <Navigate to="/admin/login" />;
  return <Outlet />;
}

export default adminPublic;
