import { Routes, Route } from "react-router-dom";
import Home from "../../Components/Manager/Home/Home";
import ManagerSignUp from "../../Components/Manager/SignUp/ManagerSignUp";
import EventData from "../../Components/Manager/SignUp/EventData";
import LogIn from "../../Components/Manager/Login/Login";
import EmailVerified from "../../Components/Manager/Common/EmailVerified";
import ManagerPublic from "./ManagerPublic";
import ManagerProtect from "./ManagerProtect";
import Bookings from "../../Components/Manager/Bookings/Bookings";
import LayOut from "../../Components/Manager/LayOut/LayOut";
import { Profile } from "../../Components/Manager/Profile/Profile";
import ChatList from "../../Components/Manager/Chat/ChatList";
import { Subscription } from "../../Components/Manager/Subscription/Subscription";
import Payment from "../../Components/Manager/Subscription/Payment/Payment";
import Success from "../../Components/Manager/Subscription/Payment/Success";
import { BookedUser } from "../../Components/Manager/Bookings/BookedUser";
import DashBoard from "../../Components/Manager/DashBoard/DashBoard";

function ManagerRoutes() {
  let routeObj = {
    login: "/login",
    signup: "/signup",
    eventdata: "/eventdata",
    bookings: "/bookings",
    profile: "/profile",
    managerverify: "/managerverify/:id",
    chat: "/chat",
    subscription: "/subscription",
    subscriptionpayment: "/subscriptionpayment/:method",
    subscriptionsuccess: "/subscriptionsuccess",
    bookinguser: "/bookinguser/:id",
    eventdetails: "/eventdetails",
  };
  return (
    <Routes>
      <Route
        path={routeObj.login}
        element={
          <ManagerPublic>
            <LogIn />
          </ManagerPublic>
        }
      ></Route>
      <Route path={routeObj.signup} element={<ManagerSignUp />}></Route>
      <Route path="/" element={<LayOut />}>
        <Route
          path={routeObj.eventdata}
          element={
            <ManagerProtect>
              <EventData />
            </ManagerProtect>
          }
        ></Route>
        <Route
          path={routeObj.eventdetails}
          element={
            <ManagerProtect>
              <Home />
            </ManagerProtect>
          }
        ></Route>
        <Route
          path={routeObj.managerverify}
          element={<EmailVerified />}
        ></Route>
        <Route
          path={routeObj.bookings}
          element={
            <ManagerProtect>
              <Bookings />
            </ManagerProtect>
          }
        ></Route>
        <Route
          path={routeObj.profile}
          element={
            <ManagerProtect>
              <Profile />
            </ManagerProtect>
          }
        ></Route>
        <Route
          path={routeObj.chat}
          element={
            <ManagerProtect>
              <ChatList />
            </ManagerProtect>
          }
        ></Route>
        <Route
          path={routeObj.subscription}
          element={
            <ManagerProtect>
              <Subscription />
            </ManagerProtect>
          }
        ></Route>
        <Route
          path={routeObj.subscriptionpayment}
          element={
            <ManagerProtect>
              <Payment />
            </ManagerProtect>
          }
        ></Route>
        <Route
          path={routeObj.subscriptionsuccess}
          element={
            <ManagerProtect>
              <Success />
            </ManagerProtect>
          }
        ></Route>
        <Route
          path={routeObj.bookinguser}
          element={
            <ManagerProtect>
              <BookedUser />
            </ManagerProtect>
          }
        ></Route>
        <Route
          index
          element={
            <ManagerProtect>
              <DashBoard />
            </ManagerProtect>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default ManagerRoutes;
