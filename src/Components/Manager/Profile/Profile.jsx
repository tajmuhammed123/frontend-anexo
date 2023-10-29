import { EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Avatar,
  Button,
  Badge,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { EditImage } from "./EditImage";
import { axiosManagerInstance } from "../../../Constants/axios";
import EditUser from "./EditUser";
import Spinner from "../../../Spinner";

export function Profile() {
  const [manager, setManager] = useState([]);
  const userData = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userData);
  const { isLoading, error } = useQuery(["managerData"], async () => {
    try {
      const userData = localStorage.getItem("managerInfo");
      const userInfo = JSON.parse(userData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      axiosManagerInstance
        .get(`/managerdata/${userInfo.user._id}`, config)
        .then((res) => (setManager(res.data.data), console.log(res.data)));
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  });

  if(isLoading ){
    return <Spinner />
}

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
                {/* <EditIcon onClick={()=>navigate(`/manager/manageredit/${manager._id}`)}/> */}
                <EditUser
                  user={manager}
                  className="hover:text-black text-white"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <EditImage id={userInfo.user._id} img={manager.profile_img} />
            </div>

            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between flex-col">
                <div className="w-full flex justify-center">
                  <Typography variant="h2" className="py-3 text-white">
                    {manager.name}
                  </Typography>
                </div>
                <div className="flex justify-between w-full">
                  <Typography variant="h5" className="text-white">
                    {manager.mob}
                  </Typography>
                  <Typography className="text-white">
                    {manager.email}
                  </Typography>
                </div>
                <div className="5 flex-col items-center gap-0 py-5">
                  <Typography variant="h5" className="text-white">
                    Wallet
                  </Typography>
                  <Typography variant="h5" className="text-white">
                    ₹ {manager.wallet_amount}
                  </Typography>
                  {/* <Button>Withdraw</Button> */}
                </div>
              </div>
            </div>
          </CardHeader>
          {/* <CardBody>
                      <Typography variant="h4" color="blue-gray">
                        UI/UX Review Check
                      </Typography>
                      <Typography variant="lead" color="gray" className="mt-3 font-normal">
                        Because it&apos;s about motivating the doers. Because I&apos;m here to
                        follow my dreams and inspire others.
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center -space-x-3">
                        <Tooltip content="Natali Craig">
                          <Avatar
                            size="sm"
                            variant="circular"
                            alt="natali craig"
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                            className="border-2 border-white hover:z-10"
                          />
                        </Tooltip>
                        <Tooltip content="Tania Andrew">
                          <Avatar
                            size="sm"
                            variant="circular"
                            alt="tania andrew"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            className="border-2 border-white hover:z-10"
                          />
                        </Tooltip>
                      </div>
                      <Typography className="font-normal">January 10</Typography>
                    </CardFooter> */}
        </Card>
      </div>
    </>
  );
}
