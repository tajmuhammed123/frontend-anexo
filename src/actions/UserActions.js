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
          console.log(data.status);
          localStorage.setItem("userInfo", JSON.stringify(data));
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
      console.log(email,password);
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
          console.log(data);
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
      console.log();
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
          console.log(data);
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
      console.log('heyy');
      console.log(value);
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
          console.log(data);
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
    console.log('heyyy');
    const { data } = await axiosUserInstance.patch(
      '/forgotpas',
      { email },
      config
    );
      console.log('done');
    console.log(data);

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      message: data,
    });
    console.log(data);
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

      console.log(data);

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
    console.log(eventdata);
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

export const userPayment= async(id)=>{
  try {
    const userData=localStorage.getItem('userInfo')
    const userInfo=JSON.parse(userData)
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        };
        const data  = await axiosUserInstance.post(
          '/payment',
          config
        );
        console.log(data);
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
        const { data } = await axiosUserInstance.post(
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
export const updateProfile= async(values)=>{
  try {
    console.log('njh');
    console.log(values);
    const userData=localStorage.getItem('userInfo')
    const userInfo=JSON.parse(userData)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    }
      const data=await axiosUserInstance.post('/updateuserprofile',values,config)
      console.log(data);
      return data
  } catch (error) {
      console.log(error.message);
  }
}


// {"user":{"_id":"64f57c95b7cf0bdbf770373c","name":"Taj Muhammed","mob":9895299091,"email":"tajmuhammed0011@gmail.com","password":"$2b$10$dSEbzqbx8Ej6HcV26FTrtus1ua9laxeKdxINs9Dk3m11JRKWkQbSC","is_manager":false,"is_admin":false,"__v":0,"is_verified":true},
// "token":{"userId":"64f57c95b7cf0bdbf770373c","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGY1N2M5NWI3Y2YwYmRiZjc3MDM3M2MiLCJpYXQiOjE2OTUyMjE1ODksImV4cCI6MTY5NTI4MTU4OX0.oZyz3LAEGTgfEZUZvFRhHdkHOF33Mhqm6K7VNpR8eVo","createdAt":"2023-09-20T14:29:52.042Z","_id":"650b07551449bf35e3db2a11","__v":0},"alert":"Logined","status":true}