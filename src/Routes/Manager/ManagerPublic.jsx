import { Navigate } from 'react-router-dom';

function ManagerPublic(props) {
  if (localStorage.getItem('managerInfo')) {
    console.log("the public route console");
      return <Navigate to="/manager/" />;
    }
    <Navigate to='/manager/login/'/>
    console.log("return case ");
    return props.children;
}

export default ManagerPublic