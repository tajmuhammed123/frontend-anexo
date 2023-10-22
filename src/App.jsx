import {BrowserRouter,Route,Routes} from "react-router-dom"
import UserRouter from "./Routes/User/UserRouter";
import AdminRoutes from "./Routes/Admin/AdminRoutes";
import ManagerRoutes from "./Routes/Manager/ManagerRoutes";
import io from 'socket.io-client'
import ChatProvider from "./Components/Manager/Chat/Components/Context/ChatProvider";
import ChatUserProvider from "./Components/User/Chat/Components/Context/ChatProvider";

const socket=io.connect('http://localhost:4000')

function App() {
  return (
  <BrowserRouter>
    <Routes>
       <Route path="/*" element={<ChatUserProvider><UserRouter/></ChatUserProvider>}/>
       <Route path="/admin/*" element={<AdminRoutes/>}/>
       <Route path="/manager/*" element={<ChatProvider><ManagerRoutes/></ChatProvider>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
