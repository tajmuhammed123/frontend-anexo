import { Navigate } from 'react-router-dom';

function userPublic(props) {
  if (localStorage.getItem('userInfo')) {
    console.log("the public route console");
      return <Navigate to="/" />;
    }
    <Navigate to='/login'/>
    console.log("return case ");
    return props.children;
}

export default userPublic