import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    USER_LOGOUT,
    USER_GOOGLE_LOGIN_REQUEST,
    USER_GOOGLE_LOGIN_SUCCESS,
    USER_GOOGLE_LOGIN_FAIL,
} from '../Constants/userConstants'

import { axiosUserInstance } from "../Constants/axios";



export const userReg= (name, mob, email, password)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axiosUserInstance.post(
            "/signup",
            { name, mob, email, password },
            config
          );
          dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}
export const userLogin= (email, password)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axiosUserInstance.post(
            "/login",
            { email, password },
            config
          );
          localStorage.setItem("userInfo", JSON.stringify(data));
          
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}
export const userVerify= (id)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              id
            }
          };
    
          const { data } = await axiosUserInstance.get(
            "/verifyemail",
            config
          );
          localStorage.setItem("userInfo", JSON.stringify(data));
          
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}
export const userGoogleLogin= (value)=>async(dispatch)=>{
    try {
        dispatch({
            type: USER_GOOGLE_LOGIN_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const values = {
            name: value.given_name,
            email: value.email,
            password: value.id,
        }
    
          const { data } = await axiosUserInstance.post(
            "/googlelogin", values ,
            config
          );
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch({
            type: USER_GOOGLE_LOGIN_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: USER_GOOGLE_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.patch(
      '/forgotpas',
      { email },
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      message: data,
    });
    return data
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      error: error,
    });
    return error
  }
};

export const forgotPasswordVerify =
  (email, otp, password) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosUserInstance.patch(
        '/verifypassword',
        { email, otp, password },
        config
      );

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        message: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RESET_PASSWORD_FAIL,
        error: error,
      });
    }
  };

export const LogoutDetails = ()=> async (dispatch)=>{
  try {
    dispatch({
      type: USER_LOGOUT,
    });

    localStorage.removeItem("userInfo");
  } catch (error) {
    console.log(error.message);
  }
}

export const EventSubmit = async(eventdata)=>
{
  try {
    const userData=localStorage.getItem('userInfo')
    const userInfo=JSON.parse(userData)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    };
    console.log(userInfo.token.token);
    const { data } = await axiosUserInstance.post(
      "/eventbooking",
      { eventdata,userInfo },
      config
    );
    return data
  } catch (error) {
    console.log(error.message);
  }
}

export const userPayment= async()=>{
  try {
    const userData=localStorage.getItem('userInfo')
    const userInfo=JSON.parse(userData)
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        };
        const data  = await axiosUserInstance.get(
          '/payment',
          config
        );
        return data
  } catch (error) {
      console.log(error.message);
  }
}
export const paymentSuccess= async(id)=>{
  try {
    const userData=localStorage.getItem('userInfo')
    const userInfo=JSON.parse(userData)
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        };
        const { data } = await axiosUserInstance.get(
          `/paymentsuccess/${id}`,
          config
        );
        return data
  } catch (error) {
      console.log(error.message);
  }
}
export const cancelOrder= async(id)=>{
  try {
    const userData=localStorage.getItem('userInfo')
    const userInfo=JSON.parse(userData)
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        };
        const { data } = await axiosUserInstance.get(
          `/cancelorder/${id}`,
          config
        );
        return data
  } catch (error) {
      console.log(error.message);
  }
}
export const updateProfile= async(id,name,mob)=>{
  try {
    const userData=localStorage.getItem('userInfo')
    const userInfo=JSON.parse(userData)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    }
      const data=await axiosUserInstance.post('/updateuserprofile',{id,name,mob},config)
      return data
  } catch (error) {
      console.log(error.message);
  }
}
