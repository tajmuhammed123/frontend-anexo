import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
} from '../Constants/userConstants'

export const userRegisterReducer = (state = { loading: false, user: {}, error: null }, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { ...state, loading: true };
  
      case USER_REGISTER_SUCCESS:
        return { ...state, loading: false, user: action.payload, error: null };
  
      case USER_REGISTER_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const ForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
      
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.message };
      
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.error };
      
    default:
      return state;
  }
};
