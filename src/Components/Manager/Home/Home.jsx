import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../Common/NavBar";
import "./Home.css";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ImageList, ImageListItem } from "@mui/material";
import {
  BarChart,
  CelebrationOutlined,
  ChatBubble,
  EmojiEventsOutlined,
  FavoriteBorderOutlined,
  FestivalOutlined,
  GroupsOutlined,
  Star,
} from "@mui/icons-material";
import { CakeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { UnAvailableDate } from "../Modals/UnAvailableDate";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useQuery } from "@tanstack/react-query";
import { EditIcon } from "@chakra-ui/icons";
import { EditAbout } from "./EditAbout";
import { EditEvents } from "./EditEvents";
import { EditImages } from "./EditImages";
import Spinner from "../../../Spinner";

function Home() {
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['ManagerDatas'],
  //   queryFn: () => {
  //     // Set the userId in the request headers
  //     const headers = {
  //       Authorization: `Bearer ${localStorage.getItem("managerInfo")}`,
  //       userId: localStorage.getItem("userId"),
  //     };

  //     return  axiosManagerInstance.get("/manager/managerdata", { headers })
  //       .then((res) => res.data);
  //   },
  // });
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
  const { manager } = useSelector((state) => state.managerInfo);
  const [eventlist, setEventlist] = useState([]);
  const [review, setReview] = useState([]);
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    console.log(manager);
    const eventlist = userdata.events;
    console.log(userdata);
  }, [userdata, manager]);

  const { isLoading, error } = useQuery({
    queryKey: ["managerdata"],
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
          `/managerdata/${manager.user._id}`,
          config
        );
        setUserdata(response.data.data.eventData);
        setEventlist(response.data.data.eventData.events);
        setReview(response.data.review);
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });
  const coverImage = manager.user.eventData
    ? `${manager.user.eventData.cover_image}`
    : "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const navigate = useNavigate();

  if(isLoading ){
    return <Spinner />
}

  return (
    <div>
      <div
        className="background-container flex justify-center align-middle"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <h3>Welcome</h3>
        <h1 className="main_text">Mr.{manager.user.name}</h1>
      </div>
      <div className="flex justify-start mr-5 my-5"></div>
      <div className="m-5 w-48 justify-between flex-col flex">
        <Button className="mb-4" onClick={() => navigate("/manager/eventdata")}>
          Add Event Datas
        </Button>
        <UnAvailableDate/>
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
                  {review ? review.length : 0}
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
                  {manager.user.rating}
                </Typography>
              </CardHeader>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex items-center align-middle m-8 flex-col">
        <div className="pb-4">
          <Typography
            variant="h2"
            className="flex flex-row align-middle items-center"
          >
            Available Events
            <EditEvents id={manager.user._id} events={eventlist} />
          </Typography>
        </div>
      </div>
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
      <div className="flex items-center align-middle m-8 flex-col">
        <div className="flex flex-row align-middle items-center">
          <Typography variant="h2">
            Images
            <EditImages images={userdata.multipleImages} />
          </Typography>
        </div>
        <ImageList className="images" variant="masonry" cols={3} gap={8}>
          {userdata.multipleImages ? (
            userdata.multipleImages.map((img, index) => (
              <ImageListItem key={index}>
                <img
                  className="rounded-md"
                  srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
          <Typography
            variant="h2"
            className="flex flex-row align-middle items-center"
          >
            About
            <EditAbout
              id={manager.user._id}
              aboutdata={userdata && userdata.about}
            />
          </Typography>
        </div>
        <div className="image-collage">
          {userdata.about ? (
            <div className="font-semibold">{userdata.about}</div>
          ) : (
            <p>About is not provided</p>
          )}
        </div>
      </div>
      <div className="flex flex-col pt-7 w-full mm bg-gray-100">
        <h1 className="flex justify-center text-2xl font-bold mb-4">REVIEWS</h1>
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
                  {/* <Typography color="blue-gray">Frontend Lead @ Google</Typography> */}
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
  );
}

export default Home;
