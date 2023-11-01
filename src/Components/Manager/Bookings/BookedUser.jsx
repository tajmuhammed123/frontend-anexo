import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  ListItemSuffix,
  List,
  ListItem,
  DialogFooter,
  DialogBody,
  Input,
  DialogHeader,
  Dialog,
  Chip,
} from "@material-tailwind/react";
import { ChatBubble } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  axiosManagerInstance,
  axiosUserInstance,
} from "../../../Constants/axios";
import { ChatState } from "../Chat/Components/Context/ChatProvider";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../Spinner";

export function BookedUser() {
  const { setSelectedChat, chats, setChats } = ChatState();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const userId = data.user_id;
  const queryClient = useQueryClient();
  const { isLoading, error } = useQuery({
    queryKey: ["bookingdata"],
    queryFn: async () => {
      try {
        const managerData = localStorage.getItem("managerInfo");
        const managerInfo = JSON.parse(managerData);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${managerInfo.token.token}`,
          },
        };
        const response = await axiosManagerInstance.get(
          `/bookeddetails/${id}`,
          config
        );
        setData(response.data.data);
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });
  const handleChat = async () => {
    try {

      const managerInfoString = localStorage.getItem("managerInfo");

      const managerInfo = JSON.parse(managerInfoString);
      const mangId = managerInfo.user._id;
      const { data } = await axiosUserInstance.post(`/accesschat`, {
        mangId,
        userId,
      });

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      navigate("/manager/chat");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmOpen = () => setConfirmOpen(!confirmOpen);

  const handlePermission = async () => {
    try {
      const managerData = localStorage.getItem("managerInfo");
      const managerInfo = JSON.parse(managerData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${managerInfo.token.token}`,
        },
      };
      const res = await axiosManagerInstance.get(
        `/confirmbooking/${amount}/${id}`,
        config
      );
      if (res.data.status) {
        queryClient.invalidateQueries("bookingdata");
        handleConfirmOpen();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if(isLoading ){
    return <Spinner />
}
  return (
    <div className="flex justify-center">
      <Card color="transparent" shadow={false} className="w-full max-w-[40rem]">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          <Avatar
            size="lg"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                {data.user_id && data.user_id.name}
              </Typography>
              <div className="5 flex items-center gap-0">
                <ChatBubble style={{ fontSize: "45px" }} onClick={handleChat} />
              </div>
            </div>
            <Typography className="flex">
              <Chip
                size="lg"
                variant="ghost"
                value={data.is_paid}
                color={
                  data.is_paid == "paid"
                    ? "green"
                    : data.is_paid === "pending"
                    ? "amber"
                    : "red"
                }
              />
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <div className="flex justify-center">
            <List className="w-4/5">
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Event Name:
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {data.event_name}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Moblie:
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {data.mob}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Event:
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {data.event}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Dishes:
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {data.preffered_dishes}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4 flex flex-col">
                <div className="flex justify-start w-full">Address:</div>
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {data.address}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Dates:
                <ListItemSuffix>
                  {data.date &&
                    data.date.map((item, index) => (
                      <div key={index}>{new Date(item).toDateString()}</div>
                    ))}
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Time:
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {data.time}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                Additional Data:
                <ListItemSuffix>
                  <Typography variant="text" color="blue-gray">
                    {data.additional_data}
                  </Typography>
                </ListItemSuffix>
              </ListItem>
            </List>
          </div>
          {data.is_paid == "not paid" ? (
            <div className="flex justify-around my-6">
              <Button color="green" onClick={handleConfirmOpen}>
                Confirm
              </Button>
              <Button color="red">Reject</Button>
            </div>
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
      <Dialog open={confirmOpen} size="xs" handler={handleConfirmOpen}>
        <div className="flex items-center justify-between">
          {" "}
          <Typography className="mb-1" variant="h4">
            Confirm to Conduct Event
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleConfirmOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Amount according to customer needs
            </Typography>
            <Input
              label="Amount"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleConfirmOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handlePermission}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
