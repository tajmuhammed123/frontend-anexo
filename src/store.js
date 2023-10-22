import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userLoginReducer,
  ForgotPasswordReducer,
} from "./reducers/userReducer";
import { adminLoginReducer } from "./reducers/AdminReducer";
import { managerLoginReducer, managerRegisterReducer } from "./reducers/ManagerReducer";

// Combine your reducers
const combinedReducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  forgotPassword: ForgotPasswordReducer,
  adminLogin: adminLoginReducer,
  managerRegister:managerRegisterReducer,
  managerInfo:managerLoginReducer
});

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userRegister", "userLogin", "forgotPassword","adminLogin","managerRegister","managerInfo"],
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, combinedReducers);

// Get stored data from localStorage
const Storage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

// Define initial state
const initialState = {
  userRegister: { userData: Storage || "No user data available yet" },
  userLogin: {}, 
  forgotPassword: {}, 
};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Create the Redux persistor
const persistor = persistStore(store);

export { store, persistor };
