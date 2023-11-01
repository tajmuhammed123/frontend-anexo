import { Navigate } from "react-router-dom";

function userPublic(props) {
  if (localStorage.getItem("userInfo")) {
    return <Navigate to="/" />;
  }
  <Navigate to="/login" />;
  return props.children;
}

export default userPublic;
