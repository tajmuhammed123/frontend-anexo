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
    MANAGER_REGISTER_SUCCESS 

    } from "../Constants/ManagerConstants";

export const managerRegisterReducer = (state = { loading: false, manager: {}, error: null }, action) => {
    switch (action.type) {
      case MANAGER_REGISTER_REQUEST:
        return { ...state, loading: true };
  
      case MANAGER_REGISTER_SUCCESS:
        return { ...state, loading: false, manager: action.payload, error: null };
  
      case MANAGER_REGISTER_FAIL:
        return { ...state, loading: false, error: action.payload };

      case MANAGER_LOGOUT:
        return {};
  
      default:
        return state;
    }
};
export const managerLoginReducer = (state = { loading: false, manager: {}, error: null }, action) => {
    switch (action.type) {
      case MANAGER_LOGIN_REQUEST:
        return { ...state, loading: true };
  
      case MANAGER_LOGIN_SUCCESS:{
        console.log(action.payload);
        return { ...state, loading: false, manager: action.payload, error: null }
      }
  
      case MANAGER_LOGIN_FAIL:
        return { ...state, loading: false, error: action.payload };

      case MANAGER_LOGOUT:
        return {};
  
      default:
        return state;
    }
};
export const managerDetailReducer = (state = { loading: false, manager: {}, error: null }, action) => {
    switch (action.type) {
      case MANAGER_EVENT_DATA_REQUEST:
        return { ...state, loading: true };
  
      case MANAGER_EVENT_DATA_SUCCESS:
        return { ...state, loading: false, manager: action.payload, error: null };
  
      case MANAGER_EVENT_DATA_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
};
