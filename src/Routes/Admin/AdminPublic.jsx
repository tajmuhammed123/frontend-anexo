import { Navigate, Outlet } from 'react-router-dom';

function adminPublic(props) {
  if (localStorage.getItem('adminInfo')) {
    console.log("the public route console");
      return <Navigate to="/admin/" />;
    }
    <Navigate to='/admin/login'/>
    console.log("return case ");
    return <Outlet />;
}

export default adminPublic