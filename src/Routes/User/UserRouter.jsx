import { Routes, Route } from "react-router-dom";
import SignUp from "../../Components/User/SignUp/SignUp";
import LogIn from "../../Components/User/Login/Login";
import Home from "../../Components/User/Home/Home";
import About from "../../Components/User/AboutPage/About";
import Events from "../../Components/User/Events/Events";
import UserPublic from "./UserPublic";
import EmailVerified from "../../Components/User/Common/EmailVerified";
import EventBooking from "../../Components/User/Events/EventBooking";
import UserProtect from "./UserProtect";
import LayOut from "../../Components/User/LayOut/LayOut";
import Success from "../../Components/User/Events/Payment/Success";
import { Profile } from "../../Components/User/Profile/Profile";
import OrderHistory from "../../Components/User/OderHistory/OrderHistory";
import Chat from "../../Components/User/Chat/Chat";

import ChatList from "../../Components/User/Chat/ChatList";
import { EditUser } from "../../Components/User/EditUser/EditUser";
import PaymentBooking from "../../Components/User/Payment/PaymentBooking";
import PaymentSuccess from "../../Components/User/Payment/PaymentSuccess";
import Payment from "../../Components/User/Events/Payment/Payment";
import History from "../../Components/User/Payment/History";
import Cancel from "../../Components/User/Payment/Cancel";
import Invoice from "../../Components/Manager/DashBoard/ReportData";

function UserRouter() {
  let routeObj = {
    about: "/detailpage/:id",
    eventlist: "/eventlist/:name",
    signup: "/signup",
    verifyemail: "/verifyemail/:id",
    eventbooking: "/eventbooking/:id",
    payment: "/payment",
    success: "/success",
    cancel: "/cancel",
    orderhistory: "/orderhistory",
    profile: "/profile",
    login: "/login",
    chatlist: "/chatlist",
    chat: "/chat",
    edituser: "/useredit/:id",
    bookingpayment: "/bookingpayment/:id",
    bookingsuccess: "/bookingsuccess",
    paymenthistory: "/paymenthistory",
    invoice: "/invoice",
  };
  return (
    <Routes>
      <Route
        path={routeObj.login}
        element={
          <UserPublic>
            <LogIn />
          </UserPublic>
        }
      />
      <Route path={routeObj.signup} element={<SignUp />}></Route>
      <Route path="/" element={<LayOut />}>
        <Route index element={<Home />}></Route>
        <Route path={routeObj.about} element={<About />}></Route>
        <Route path={routeObj.eventlist} element={<Events />}></Route>
        <Route path={routeObj.verifyemail} element={<EmailVerified />}></Route>
        <Route
          path={routeObj.eventbooking}
          element={
            <UserProtect>
              <EventBooking />
            </UserProtect>
          }
        />
        <Route path={routeObj.success} element={<Success />}></Route>
        <Route path={routeObj.cancel} element={<Cancel />}></Route>
        <Route
          path={routeObj.orderhistory}
          element={
            <UserProtect>
              <OrderHistory />
            </UserProtect>
          }
        ></Route>
        <Route
          path={routeObj.profile}
          element={
            <UserProtect>
              <Profile />
            </UserProtect>
          }
        ></Route>
        <Route
          path={routeObj.chatlist}
          element={
            <UserProtect>
              <ChatList />
            </UserProtect>
          }
        ></Route>
        <Route
          path={routeObj.chat}
          element={
            <UserProtect>
              <Chat />
            </UserProtect>
          }
        ></Route>
        <Route
          path={routeObj.edituser}
          element={
            <UserProtect>
              <EditUser />
            </UserProtect>
          }
        ></Route>
        <Route
          path={routeObj.bookingpayment}
          element={
            <UserProtect>
              <PaymentBooking />
            </UserProtect>
          }
        ></Route>
        <Route
          path={routeObj.payment}
          element={
            <UserProtect>
              <Payment />
            </UserProtect>
          }
        ></Route>
        <Route
          path={routeObj.bookingsuccess}
          element={
            <UserProtect>
              <PaymentSuccess />
            </UserProtect>
          }
        ></Route>
        <Route
          path={routeObj.paymenthistory}
          element={
            <UserProtect>
              <History />
            </UserProtect>
          }
        ></Route>
        <Route path={routeObj.invoice} element={<Invoice />}></Route>
      </Route>
    </Routes>
  );
}

export default UserRouter;
