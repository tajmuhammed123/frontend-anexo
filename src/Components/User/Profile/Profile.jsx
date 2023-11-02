
import {
  Button,
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosUserInstance } from "../../../Constants/axios";
import { useQuery } from "@tanstack/react-query";
import { EditImage } from "./EditImage";
import EditUser from "./Edit";

export function Profile() {
  const [user, setUser] = useState([]);
  const userData = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userData);
  const { isLoading, error } = useQuery(["userData"], async () => {
    try {
      const userData = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      axiosUserInstance
        .get(`/userdata/${userInfo.user._id}`, config)
        .then((res) => setUser(res.data.user));
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  });
  const navigate = useNavigate();


  return (
    <>
      <div className="flex mt-8 align-middle items-center h-screen flex-col">
        <div>
          <Typography variant="h1" color="blue-gray" className="font-large">
            PROFILE
          </Typography>
        </div>
        <Card className="my-6" style={{ width: "500px" }} color="gray">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="p-4 rounded-none"
          >
            <div className="flex justify-end">
              <div className="bg-black hover:bg-white rounded-full p-2">
                <EditUser user={user} className="hover:text-black text-white" />
              </div>
            </div>
            <div className="flex justify-center">
              <EditImage id={userInfo.user._id} img={user.profile_img} />
            </div>

            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between flex-col">
                <div className="w-full flex justify-center">
                  <Typography variant="h2" className="py-3 text-white">
                    {user.name}
                  </Typography>
                </div>
                <div className="flex justify-between w-full">
                  <Typography variant="h5" className="text-white">
                    {user.mob}
                  </Typography>
                  <Typography className="text-white">{user.email}</Typography>
                </div>
                <div className="5 flex-col items-center flex justify-center gap-0 py-5">
                  <Typography variant="h5" className="text-white">
                    Wallet
                  </Typography>
                  <Typography variant="h5" className="text-white">
                    ₹ {user.wallet_amount}
                  </Typography>
                  <Button color="white" onClick={()=>navigate('/paymenthistory')}>Payment History</Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
