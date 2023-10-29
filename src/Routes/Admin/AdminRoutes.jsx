import { Routes, Route } from "react-router-dom";
import AdminLogIn from "../../Components/Admin/AdminLogin/AdminLogin";
import AdminPublic from "./AdminPublic";
import AdminHome from "../../Components/Admin/Home/AdminHome";
import AdminProtect from "./AdminProtect";
import LayOut from "../../Components/Admin/LayOut/LayOut";
import UserData from "../../Components/Admin/UserData/UserData";
import EventCategory from "../../Components/Admin/Categories/eventCategory";
import { Report } from "../../Components/Admin/Reports/Report";
import { Detail } from "../../Components/Admin/Reports/Detail";
import BannerList from "../../Components/Admin/Banner/BannerList";
import AddBanner from "../../Components/Admin/Banner/AddBanner";
import { EventCategoreyList } from "../../Components/Admin/EventCategorey/EventCategoreyList";

let routeObj = {
  dashboard: "/dashboard",
  userdata: "/userdata",
  login: "/login",
  eventcategorey: "/addeventcategorey",
  report: "/reportdata",
  detailreport: "/reportdetails/:id",
  bannerlist: "/bannerlist",
  addbanner: "/addbanner/:id",
  eventlist: "/eventcategorey",
};

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminPublic />}>
        <Route exact path={routeObj.login} element={<AdminLogIn />} />
      </Route>
      <Route element={<AdminProtect />}>
        <Route path="/" element={<LayOut> </LayOut>}>
          <Route index element={<AdminHome />} />
          <Route path={routeObj.dashboard} element={<AdminHome />} />
          <Route path={routeObj.userdata} element={<UserData />} />
          <Route path={routeObj.eventcategorey} element={<EventCategory />} />
          <Route path={routeObj.report} element={<Report />} />
          <Route path={routeObj.detailreport} element={<Detail />} />
          <Route path={routeObj.bannerlist} element={<BannerList />} />
          <Route path={routeObj.addbanner} element={<AddBanner />} />
          <Route path={routeObj.eventlist} element={<EventCategoreyList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
