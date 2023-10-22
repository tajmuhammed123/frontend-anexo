import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Button,
  Input,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosUserInstance } from '../../../Constants/axios';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery, useQueryClient } from '@tanstack/react-query';

function Events() {
  const [data, setData] = useState([]);
  const [searchInput,setSearchInput]=useState('')
  const [events, setEventdata] = useState([]);
  const { name } = useParams();
  const queryClient = useQueryClient();
  const [active, setActive] = useState(1);

  const fetchData = async (page) => {
    try {
      const response = await axiosUserInstance.get(`/eventlist?name=${name}&page=${page}`);
      return response.data.managers;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };

  useEffect(() => {
    queryClient.prefetchQuery(['eventlistdata', active], () => fetchData(active));
  }, [active, queryClient]);

  const { data: loadedData } = useQuery(['eventlistdata', active], fetchData);

  const homedata = async () => {
    try {
      const response = await axiosUserInstance.get('/geteventdata');
      setEventdata(response.data.eventData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    homedata();
  }, []);

  const navigate = useNavigate();

  const next = () => {
    if (active < 5) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const renderPageButtons = () => {
    const pages = [1, 2, 3, 4, 5]; // Customize the number of pages as needed
    return pages.map((page) => (
      <Button
        key={page}
        variant={active === page ? "filled" : "text"}
        color="gray"
        onClick={() => { setActive(page); queryClient.invalidateQueries('eventlistdata'); }}
      >
        {page}
      </Button>
    ));
  }
  const eventDatas = loadedData&&loadedData.filter(user => {
    const searchInputLower = searchInput.toLowerCase();
    const nameMatch = user.eventData.team_name.toLowerCase().includes(searchInputLower);
    return nameMatch ;
  })
  return (
    <>
      <div>
        <div className='background-container'>
          <h1 className='main_text uppercase'>{name}</h1>
        </div>
      </div>
      <div className='main-content'>
        <div className='flex flex-col align-middle justify-center items-center py-8'>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
              onChange={(e)=>setSearchInput(e.target.value)}
            />
            <Button size="sm" className="!absolute right-1 top-1 rounded">
              Search
            </Button>
          </div>
          <div className='flex flex-wrap justify-center pt-10'>
            {eventDatas ? eventDatas.map((card, index) => {
              const coverImage = `${card.eventData.cover_image}`;
              const eventlist = card.eventData.events;
              return (
                <Card className="w-full max-w-[17rem] h-[30rem] shadow-lg mx-5" key={index} onClick={() => navigate(`/detailpage/${card._id}`)}>
                  <CardHeader className='h-[10rem]' floated={false} color="white">
                    <img className='align-middle flex justify-center'
                      src={coverImage}
                      alt="ui/ux review check"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                  </CardHeader>
                  <CardBody className='h-[15rem]'>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray" className="font-medium">
                        {card.eventData.team_name}
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="-mt-0.5 h-5 w-5 text-yellow-700"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        4.1
                      </Typography>
                    </div>
                    <Typography color="gray">
                      <ul>
                        {eventlist.map((event) => (
                          <li key={event}>{event}</li>
                        ))}
                      </ul>
                    </Typography>
                    <div className="group mt-5 inline-flex flex-wrap items-center gap-3">
                      {events.map((item, index) => (
                        eventlist.includes(item.event_name) && (
                          <Tooltip content={item.event_name} key={index}>
                            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                              <img className="h-5 w-5" src={item.event_image} alt="profile-picture" />
                            </span>
                          </Tooltip>
                        )
                      ))}
                    </div>
                  </CardBody>
                  <CardFooter className="h-[6rem]">
                    <Button className='mb-0' size="lg" fullWidth={true}>
                      Book Your Slot
                    </Button>
                  </CardFooter>
                </Card>
              );
            }) : <h2>Sorry there are no Event managers found for this event</h2>}
          </div>
        </div>
      </div>
      <div>
      <div>
        <div className="flex justify-center p-5 gap-4 w-full">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            {renderPageButtons()}
          </div>
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={next}
            disabled={active === 5}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Events;
