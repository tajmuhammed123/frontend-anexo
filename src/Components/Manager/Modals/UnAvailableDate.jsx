import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import moment from "moment";
import Calendar from "react-calendar";
import { useState } from "react";
import { useEffect } from "react";
 
export function UnAvailableDate() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
  const [date,setDate]=useState([])
  const changeDate = (e) => {
    const selectedDate = e;
    setDate([...date, selectedDate]);
  };

  useEffect(() => {
    console.log(date); // This will log the updated state whenever 'date' changes
  }, [date]);

  
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
        <Calendar
        value={date}
        onChange={changeDate}
      />
      <p>Current selected date is <b>{moment(date).format('MMMM Do YYYY')}</b></p>

      {/* Include other form fields here */}
      {/* Example input for the selected date */}
      <input
        type="hidden"
        name="date"
        value={moment(date).format('YYYY-MM-DD')}
      />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}