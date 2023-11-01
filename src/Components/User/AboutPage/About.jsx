import { useEffect, useState } from "react";
import "./About.css";
import {
  Typography,
  Card,
  Button,
  CardBody,
  Avatar,
} from "@material-tailwind/react";

import { CardHeader } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosUserInstance } from "../../../Constants/axios";
import { ImageList, ImageListItem } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import {
  CelebrationOutlined,
  ChatBubble,
  EmojiEventsOutlined,
  FavoriteBorderOutlined,
  FestivalOutlined,
  GroupsOutlined,
} from "@mui/icons-material";
import { ChatState } from "../Chat/Components/Context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import { ReviewModal } from "./ReviewModal";
import { ReportModal } from "./ReportModal";
import Spinner from "../../../Spinner";

function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function About() {
  const { setSelectedChat, chats, setChats } = ChatState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState(0);
  const [eventlist, setEventlist] = useState([]);

  useEffect(() => {
    const managerdata = async () => {
      try {
        setLoading(true);
        const response = await axiosUserInstance.get(`/detailpage?id=${id}`);
        setData(response.data.result);
        setRating(response.data.rating);
        setReview(response.data.review);
        setLoading(false);

        const eventlist = response.data.result.events;
        setEventlist(eventlist);
      } catch (error) {
        console.log(error.message);
      }
    };

    managerdata();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }


  const handleChat = async () => {
    try {
      if (localStorage.getItem("userInfo")) {
        const userInfoString = localStorage.getItem("userInfo");

        const userInfo = JSON.parse(userInfoString);
        const userId = userInfo.user._id;
        const mangId = id;
        const { data } = await axiosUserInstance.post(`/accesschat`, {
          mangId,
          userId,
        });

        if (!chats.find((c) => c._id === data._id)) {
          setChats([data, ...chats]);
        }
        setSelectedChat(data);
        navigate("/chatlist");
      } else {
        toast("Login to chat");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <div className="background-container">
          <h1 className="main_text">{data.team_name}</h1>
        </div>
      </div>
      <div className="main-content">
        <div className="flex justify-between p-5">
          <Button onClick={() => navigate(`/eventbooking/${id}`)}>
            Book Slot
          </Button>
          <ChatBubble style={{ fontSize: "45px" }} onClick={handleChat} />
        </div>
        <div className="px-5">
          {localStorage.getItem("userInfo") ? (
            <ReportModal id={id} />
          ) : (
            <Button>Report</Button>
          )}
        </div>
        <div className="flex align-middle justify-center w-100 mt-10">
          <Card
            color="gray"
            variant="gradient"
            className="w-full max-w-[25rem] p-5 flex justify-center"
          >
            <div className="flex flex-row gap-4 justify-center">
              <div className="flex flex-row gap-4">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none border-white/10 text-center p-3"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal uppercase"
                  >
                    EVENTS
                  </Typography>
                  <Typography
                    variant="h1"
                    color="white"
                    className=" flex justify-center gap-1 text-7xl font-normal"
                  >
                    {eventlist.length}
                  </Typography>
                </CardHeader>
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none border-white/10 text-center p-3"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal uppercase"
                  >
                    REVIEWS
                  </Typography>
                  <Typography
                    variant="h1"
                    color="white"
                    className=" flex justify-center gap-1 text-7xl font-normal"
                  >
                    {review.length}
                  </Typography>
                </CardHeader>
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none border-white/10 text-center p-3"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal uppercase"
                  >
                    RATING
                  </Typography>
                  <Typography
                    variant="h1"
                    color="white"
                    className=" flex justify-center gap-1 text-7xl font-normal"
                  >
                    {rating}
                  </Typography>
                </CardHeader>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col pt-7 w-full mm">
          <h1 className="flex justify-center text-2xl font-bold mb-4">
            Available Events
          </h1>
          <div className="flex gap-2 justify-center w-full">
            {eventlist.includes("birthday") && (
              <Button
                variant="gradient"
                className="flex items-center gap-3 py-2 px-3"
              >
                <CakeIcon />
                Birthdays
              </Button>
            )}
            {eventlist.includes("wedding") && (
              <Button
                variant="gradient"
                className="flex items-center gap-3 py-2 px-3"
              >
                <FavoriteBorderOutlined />
                Weddings
              </Button>
            )}
            {eventlist.includes("party") && (
              <Button
                variant="gradient"
                className="flex items-center gap-3 py-2 px-3"
              >
                <CelebrationOutlined />
                Partys
              </Button>
            )}
            {eventlist.includes("competition") && (
              <Button
                variant="gradient"
                className="flex items-center gap-3 py-2 px-3"
              >
                <EmojiEventsOutlined />
                Competition
              </Button>
            )}
            {eventlist.includes("conference") && (
              <Button
                variant="gradient"
                className="flex items-center gap-3 py-2 px-3"
              >
                <GroupsOutlined />
                Conference
              </Button>
            )}
            {eventlist.includes("specialEvents") && (
              <Button
                variant="gradient"
                className="flex items-center gap-3 py-2 px-3"
              >
                <FestivalOutlined />
                Special event
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center align-middle m-8 flex-col">
          <div className="pb-4">
            <Typography variant="h2">Images</Typography>
          </div>
          <ImageList className="images" variant="masonry" cols={3} gap={8}>
            {data.multipleImages ? (
              data.multipleImages.map((img, index) => (
                <ImageListItem key={index}>
                  <img
                    className="rounded-md"
                    src={`${img}?w=248&fit=crop&auto=format`}
                    alt={img}
                  />
                </ImageListItem>
              ))
            ) : (
              <p>No image</p>
            )}
          </ImageList>
        </div>
        <div className="flex items-center align-middle m-8 flex-col">
          <div className="pb-4">
            <Typography variant="h2">About</Typography>
          </div>
          <div className="image-collage">
            {data.about ? (
              <div className="font-semibold">{data.about}</div>
            ) : (
              <p>About is not provided</p>
            )}
          </div>
          <ToastContainer />
        </div>
        <div className="flex flex-col pt-7 w-full mm bg-gray-100">
          <h1 className="flex justify-center text-2xl font-bold mb-4">
            REVIEWS
          </h1>
          <div className="justify-end flex p-5">
            <ReviewModal id={id} />
          </div>
          <div className="flex flex-wrap gap-2 justify-center px-10">
            {review.map((data, index) => (
              <Card
                color="transparent"
                shadow={false}
                className="w-full max-w-[26rem] bg-white mb-9 p-5"
                key={index}
              >
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
                        {data.user.name}
                      </Typography>
                      <div className="5 flex items-center gap-0">
                        {Array.from({ length: data.starcount }, (_, i) => (
                          <Star key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="mb-6 p-0">
                  <Typography>{data.content}</Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
