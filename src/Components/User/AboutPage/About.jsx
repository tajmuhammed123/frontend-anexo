import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StickyNavbar } from '../Common/NavBar';
import './About.css';
import {   
  Typography,
  Card,
  Button,
  IconButton,
  CardBody,
  Avatar
} from "@material-tailwind/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

  import {
    CardHeader,
  } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosUserInstance } from '../../../Constants/axios';
import { ImageList, ImageListItem } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import { Celebration, CelebrationOutlined, ChatBubble, EmojiEvents, EmojiEventsOutlined, FavoriteBorderOutlined, FestivalOutlined, GroupsOutlined } from '@mui/icons-material';
import { Footer } from '../Common/Footer';
import { ChatState } from '../Chat/Components/Context/ChatProvider';
import { ToastContainer, toast } from 'react-toastify';
import { StarIcon } from '@chakra-ui/icons';
import { ReviewModal } from './reviewModal';
import { ReportModal } from './ReportModal';

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
   
  // function CheckIcon() {
  //   return (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth={2}
  //       stroke="currentColor"
  //       className="h-3 w-3"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M4.5 12.75l6 6 9-13.5"
  //       />
  //     </svg>
  //   );
  // }

function About() {

  const {
    setSelectedChat,
    chats,
    setChats,
  } = ChatState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [review, setReview] = useState([]);
  const [eventlist, setEventlist] = useState([]);

  useEffect(() => {
    const managerdata = async () => {
      try {
        const response = await axiosUserInstance.get(`/detailpage?id=${id}`);
        setData(response.data.result);
        setReview(response.data.review)
        console.log(response.data.review);

        const eventlist = response.data.result.events
          setEventlist(eventlist)
      } catch (error) {
        console.log(error.message);
      }
    };

    managerdata();
  }, [id]);

  console.log(data);

  const handleChat=async()=>{
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${user.user.token}`,
      //   },
      // };
      // const userId=user.user._id
      if(localStorage.getItem("userInfo")){

        const userInfoString = localStorage.getItem("userInfo");
  
        const userInfo = JSON.parse(userInfoString)
        const userId=userInfo.user._id
        const mangId=id
        const { data } = await axiosUserInstance.post(`/accesschat`, { mangId,userId });
        console.log(data);
  
        if (!chats.find((c) => c._id === data._id)) {
          console.log('nothing');
          setChats([data, ...chats])}
        console.log(data,'data');
        console.log(chats,'chat');
        setSelectedChat(data);
        navigate('/chatlist')
      }else{
        toast('Login to chat')
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
        <div>
          <div className='background-container'>
            <h1 className='main_text'>{data.team_name}</h1>
          </div>
        </div>
        <div className='main-content'>
        <div className='flex justify-between p-5'>
        <Button onClick={()=>navigate(`/eventbooking/${id}`)}>Book Slot</Button>
        <ChatBubble style={{ fontSize: '45px' }} onClick={handleChat}/>
        {/* <IconButton color="red" className="rounded-full">
        <FontAwesomeIcon icon={faHeart} />
      </IconButton> */}
        </div>
        <div className='px-5'>
          {localStorage.getItem("userInfo")?<ReportModal id={id}/>:<Button>Report</Button>}
        </div>
          <div  className='flex align-middle justify-center w-100 mt-10'>
          <Card color="gray" variant="gradient" className="w-full max-w-[25rem] p-5 flex justify-center">
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
                  >{eventlist.length}
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
                  >{review.length}
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
                  LIKES
                </Typography>
                <Typography
                  variant="h1"
                  color="white"
                  className=" flex justify-center gap-1 text-7xl font-normal"
                  >29
                </Typography>
              </CardHeader>
              </div>
            </div>
          </Card>
          </div>
        <div className='flex flex-col pt-7 w-full mm'>
          <h1 className='flex justify-center text-2xl font-bold mb-4'>Available Events</h1>
          <div className="flex gap-2 justify-center w-full">
              
      {eventlist.includes('birthday') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <CakeIcon/>
        Birthdays
      </Button>)}
      {eventlist.includes('wedding') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <FavoriteBorderOutlined/>
        Weddings
      </Button>)}
      {eventlist.includes('party') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <CelebrationOutlined/>
        Partys
      </Button>)}
      {eventlist.includes('competition') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <EmojiEventsOutlined/>
        Competition
      </Button>)}
      {eventlist.includes('conference') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <GroupsOutlined/>
        Conference
      </Button>)}
      {eventlist.includes('specialEvents') && (<Button variant="gradient" className="flex items-center gap-3 py-2 px-3">
        <FestivalOutlined/>
        Special event
      </Button>)}
          </div>
        </div>
          <div className='flex items-center align-middle m-8 flex-col'>
            <div className='pb-4'>
            <Typography variant="h2">Images</Typography>
            </div>
              <ImageList className='images' variant="masonry" cols={3} gap={8}>
              {data.multipleImages ? (data.multipleImages.map((img,index) => (
                <ImageListItem key={index}>
                  <img className='rounded-md'
                    srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${img}?w=248&fit=crop&auto=format`}
                    alt={img}
                  />
                </ImageListItem>
              ))):(<p>No image</p>)}
            </ImageList>
          </div>
          <div className='flex items-center align-middle m-8 flex-col'>
            <div className='pb-4'>
            <Typography variant="h2">About</Typography>
            </div>
            <div className="image-collage">
              {data.about ? (
                <div className="font-semibold">{data.about}</div>
                    ) : (
                      <p>About is not provided</p>
                      )}
              </div>
              <ToastContainer/>
          </div>
          <div className='flex flex-col pt-7 w-full mm bg-gray-100'>
          <h1 className='flex justify-center text-2xl font-bold mb-4'>REVIEWS</h1>
          <div className='justify-end flex p-5'>
            <ReviewModal id={id}/>
          </div>
          <div className="flex flex-wrap gap-2 justify-center px-10">
          {review.map((data, index) => (
            <Card color="transparent" shadow={false} className="w-full max-w-[26rem] bg-white mb-9 p-5" key={index}>
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
                <Typography>
                  {data.content}
                </Typography>
              </CardBody>
            </Card>
          ))}

          </div>
        </div>
      {/* <div className="mx-auto max-w-screen-md py-12">
          <Card className="mb-12 overflow-hidden">
            <img
              alt="nature"
              className="h-[32rem] w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
            />
          </Card>
          <Typography variant="h2" color="blue-gray" className="mb-2">
            Random Text
          </Typography>
          <Typography color="gray" className="font-normal">
            Can you help me out? you will get a lot of free exposure doing this
            can my website be in english?. There is too much white space do less
            with more, so that will be a conversation piece can you rework to make
            the pizza look more delicious other agencies charge much lesser can
            you make the blue bluer?. I think we need to start from scratch can my
            website be in english?, yet make it sexy i&apos;ll pay you in a week
            we don&apos;t need to pay upfront i hope you understand can you make
            it stand out more?. Make the font bigger can you help me out? you will
            get a lot of free exposure doing this that&apos;s going to be a chunk
            of change other agencies charge much lesser. Are you busy this
            weekend? I have a new project with a tight deadline that&apos;s going
            to be a chunk of change. There are more projects lined up charge extra
            the next time.
          </Typography>
        </div> */}
        </div>
      </>
  );
}

export default About;
