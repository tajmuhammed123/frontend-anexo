import { Navigate } from "react-router-dom";

function ManagerPublic(props) {
  if (localStorage.getItem("managerInfo")) {
    return <Navigate to="/manager/" />;
  }
  <Navigate to="/manager/login/" />;
  return props.children;
}

export default ManagerPublic;
