import {Routes, Route} from 'react-router-dom'
import Home from '../../Components/Manager/Home/Home'
import ManagerSignUp from '../../Components/Manager/SignUp/ManagerSignUp'
import EventData from '../../Components/Manager/SignUp/EventData'
import LogIn from '../../Components/Manager/Login/Login'
import EmailVerified from '../../Components/Manager/Common/EmailVerified'
import ManagerPublic from './ManagerPublic'
import ManagerProtect from './ManagerProtect'
import Bookings from '../../Components/Manager/Bookings/Bookings'
import LayOut from '../../Components/Manager/LayOut/LayOut'
import { Profile } from '../../Components/Manager/Profile/Profile'
import ChatList from '../../Components/Manager/Chat/ChatList'
import { EditManager } from '../../Components/Manager/EditManager/EditManager'
import { Subscription } from '../../Components/Manager/Subscription/subscription'
import Payment from '../../Components/Manager/Subscription/Payment/Payment'
import Success from '../../Components/Manager/Subscription/Payment/Success'
import { BookedUser } from '../../Components/Manager/Bookings/BookedUser'

function ManagerRoutes() {
  let routeObj={
    login:'/login',
    signup:'/signup',
    eventdata:'/eventdata',
    bookings:'/bookings',
    profile:'/profile',
    managerverify:'/managerverify/:id',
    chat:'/chat',
    editmanager:'/manageredit/:id',
    subscription:'/subscription',
    subscriptionpayment:'/subscriptionpayment/:method',
    subscriptionsuccess:'/subscriptionsuccess',
    bookinguser:'/bookinguser/:id',
  }
  return (
    <Routes>
      <Route path={routeObj.login} element={<ManagerPublic><LogIn/></ManagerPublic>}></Route>
      <Route path={routeObj.signup} element={<ManagerSignUp/>}></Route>
        <Route path="/" element={ <LayOut/>}>
          <Route path={routeObj.eventdata} element={<ManagerProtect><EventData/></ManagerProtect>}></Route>
          <Route index element={<ManagerProtect><Home/></ManagerProtect>}></Route>
          <Route path={routeObj.managerverify} element={<EmailVerified/>}></Route>
          <Route path={routeObj.bookings} element={<Bookings/>}></Route>
          <Route path={routeObj.profile} element={<ManagerProtect><Profile /></ManagerProtect>}></Route>
          <Route path={routeObj.chat} element={<ChatList />}></Route>
          <Route path={routeObj.editmanager} element={<EditManager />}></Route>
          <Route path={routeObj.subscription} element={<Subscription />}></Route>
          <Route path={routeObj.subscriptionpayment} element={<Payment />}></Route>
          <Route path={routeObj.subscriptionsuccess} element={<Success />}></Route>
          <Route path={routeObj.bookinguser} element={<BookedUser />}></Route>
        </Route>
    </Routes>
  )
}

export default ManagerRoutes