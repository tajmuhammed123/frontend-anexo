import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { EditIcon } from "@chakra-ui/icons";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { GenerateSuccess } from "../../../Validation/EventUpdation";

export function EditEvents({ id, events }) {
  const [data, setEventdata] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [eventlist, setEvents] = useState([]);

  //   const [data,setEventdata]=useState([])
  const userInfoString = localStorage.getItem("managerInfo");

  const userInfo = JSON.parse(userInfoString);

  useEffect(() => {
    console.log(events);
    axiosManagerInstance
      .get(`/geteventdata/${userInfo.user._id}`)
      .then((res) => {
        setEventdata(res.data.eventData);
      });
    console.log(events);
    setEvents(events);
    console.log(eventlist);
  }, [eventlist]);

  const handleOpen = () => setOpen(!open);
  const queryclient = useQueryClient();
  const handleEvents = async (eventName) => {
    try {
      if (!eventlist.includes(eventName)) {
        eventlist.push(eventName);
        //   setEvents((prevEvents) => [...prevEvents, eventName]);
        setEvents([...events, eventName]);
      } else {
        const indexToRemove = eventlist.indexOf(eventName);
        if (indexToRemove !== -1) {
          events.splice(indexToRemove, 1);
        }
        setEvents([...events, eventName]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosManagerInstance.patch(`/editevents`, {
        id,
        eventlist,
      });
      if (res.data.status) {
        GenerateSuccess("About Updated Successfully");
        queryclient.invalidateQueries("managerdata");
        setTimeout(() => {
          handleOpen();
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <EditIcon
        className="w-5 h-5 p-2 ml-3 cursor-pointer"
        onClick={handleOpen}
      />
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Edit About
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write the message and then click button.
          </Typography>
          <div className="grid gap-6">
            {data.map((item, index) => (
              <Checkbox
                key={index}
                name={item.event_name}
                onChange={(e) => handleEvents(e.target.name)}
                checked={events.includes(item.event_name)}
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center mr-5 font-normal"
                  >
                    {item.event_name}
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleSubmit}>
            Update Event
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
