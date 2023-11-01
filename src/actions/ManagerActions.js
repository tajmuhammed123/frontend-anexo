
import { 
    MANAGER_EVENT_DATA_FAIL,
    MANAGER_EVENT_DATA_REQUEST,
    MANAGER_EVENT_DATA_SUCCESS,
    MANAGER_LOGIN_FAIL,
    MANAGER_LOGIN_REQUEST,
    MANAGER_LOGIN_SUCCESS,
    MANAGER_LOGOUT, 
    MANAGER_REGISTER_FAIL, 
    MANAGER_REGISTER_REQUEST, 
    MANAGER_RESET_PASSWORD_FAIL, 
    MANAGER_RESET_PASSWORD_REQUEST, 
    MANAGER_RESET_PASSWORD_SUCCESS
    } from "../Constants/ManagerConstants";
import { axiosManagerInstance } from "../Constants/axios";

export const managerReg= (name,email,mob, password)=>async(dispatch)=>{
    try {
        dispatch({
            type: MANAGER_REGISTER_REQUEST,
          });
          const config = {
            headers: {
              "Content-Type": "application/json"
            },
          };
          const { data } = await axiosManagerInstance.post(
            "/signup",
             {name,email,mob, password},
            config
          );
          return data
    } catch (error) {
        dispatch({
            type: MANAGER_REGISTER_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}

export const LogoutDetails = ()=> async (dispatch)=>{
    try {
      dispatch({
        type: MANAGER_LOGOUT,
      });
  
      localStorage.removeItem("managerInfo");
    } catch (error) {
      console.log(error.message);
    }
  }

  export const managerLogin= (email, password)=>async(dispatch)=>{
    try {
        dispatch({
            type: MANAGER_LOGIN_REQUEST,
          });
    
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          const { data } = await axiosManagerInstance.post(
            "/",
            { email, password },
            config
          );
          localStorage.setItem("managerInfo", JSON.stringify(data));
          
          dispatch({
            type: MANAGER_LOGIN_SUCCESS,
            payload: data,
          });
          return data
    } catch (error) {
        dispatch({
            type: MANAGER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
          return error
    }
}

export const managerVerify= (id)=>async(dispatch)=>{
  try {
      dispatch({
          type: MANAGER_LOGIN_REQUEST,
        });
  
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            id
          }
        };
  
        const { data } = await axiosManagerInstance.get(
          "/managerverify",
          config
        );
        localStorage.setItem("managerInfo", JSON.stringify(data));
        
        dispatch({
          type: MANAGER_LOGIN_SUCCESS,
          payload: data,
        });
        return data
  } catch (error) {
      dispatch({
          type: MANAGER_LOGIN_FAIL,
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
      type: MANAGER_RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosManagerInstance.patch(
      '/forgotpas',
      { email },
      config
    );

    dispatch({
      type: MANAGER_RESET_PASSWORD_SUCCESS,
      message: data,
    });
    return data
  } catch (error) {
    dispatch({
      type: MANAGER_RESET_PASSWORD_FAIL,
      error: error,
    });
    return error
  }
};

export const forgotPasswordVerify =
  (email, otp, password) => async (dispatch) => {
    try {
      dispatch({
        type: MANAGER_RESET_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosManagerInstance.patch(
        '/verifypassword',
        { email, otp, password },
        config
      );


      dispatch({
        type: MANAGER_RESET_PASSWORD_SUCCESS,
        message: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: MANAGER_RESET_PASSWORD_FAIL,
        error: error,
      });
    }
  };

export const managerDetail = (eventdata,formData)=>async(dispatch)=>{
    try {

      const tokenId = JSON.parse(localStorage.getItem("managerInfo"))
        dispatch({
            type: MANAGER_EVENT_DATA_REQUEST,
            Authorization: `Bearer ${tokenId.token}`
        })
        const managerData=localStorage.getItem('managerInfo')
        const managerInfo=JSON.parse(managerData)
        const config={
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${managerInfo.token.token}`,
          }
        }
        const {data} =await axiosManagerInstance.post(
         `/eventdata/${tokenId.user._id}`,
          {formData,eventdata},
          config
        )

        dispatch({
          type: MANAGER_EVENT_DATA_SUCCESS,
          payload:data
        })
        return data                                                                                                                                                                                                                                                                                                                             
    } catch (error) {
      dispatch({
        type: MANAGER_EVENT_DATA_FAIL,
        payload:error
      })
      return error
    }
}

export const updateProfile= async(name,id,mob)=>{
  try {
    const userData=localStorage.getItem('managerInfo')
    const userInfo=JSON.parse(userData)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    }
      const data=await axiosManagerInstance.patch('/updatemanagerprofile',{name,id,mob},config)
      return data
  } catch (error) {
      console.log(error.message);
  }
}

export const subsciptionPayment= async(method)=>{
  try {
    const userData=localStorage.getItem('managerInfo')
    const userInfo=JSON.parse(userData)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    }
      const data=await axiosManagerInstance.get(`/subscriptionpayment/${method}`,config)
      return data
  } catch (error) {
      console.log(error.message);
  }
}
export const subscriptionSuccess= async(method)=>{
  try {
    const userData=localStorage.getItem('managerInfo')
    const userInfo=JSON.parse(userData)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    }
    let values={
      method:method,
      id:userInfo.user._id
    }
      const data=await axiosManagerInstance.post('/subscriptionsuccess',values,config)
      return data
  } catch (error) {
      console.log(error.message);
  }
}
