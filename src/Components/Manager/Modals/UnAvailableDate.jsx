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
import { axiosManagerInstance, axiosUserInstance } from "../../../Constants/axios";
import { GenerateSuccess } from "../../../Validation/EventUpdation";
import { ToastContainer } from "react-toastify";

export function UnAvailableDate() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [dateData, setDate] = useState([]);
  const manager= localStorage.getItem('managerInfo')
  const managerInfo = JSON.parse(manager)
  const fetchData = async () => {
    try {

      await axiosUserInstance
        .get(`/managerdata/${managerInfo.user._id}`)
        .then((res) => setDate(res.data.data.booked_dates)
        .catch((err) => console.log(err.message)))
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();

    console.log("heyy");
  }, []);

  useEffect(() => {
    console.log(dateData);
  }, [dateData]);

  const currentDate = new Date();

  const changeDate = (e) => {
    const selectedDate = e;
    const dateIndex = dateData.findIndex((date) =>
      moment(date).isSame(selectedDate, "day")
    );
  
    if (dateIndex === -1) {
      // Date is not in the array, so add it
      setDate((prevDate) => [...prevDate, selectedDate]);
    } else {
      // Date is in the array, so remove it
      setDate((prevDate) => prevDate.filter(
        (date) => !moment(date).isSame(selectedDate, "day")
      ));      
    }
  };

  const handleSubmit = async()=>{
    try {
      const date=dateData.map((dateString) => new Date(dateString))
      console.log(date);
      const res=await axiosManagerInstance.put('/updatedates',{date,id:managerInfo.user._id})
      if(res.data.status){
        GenerateSuccess("Dates Updated Successfully");
        setTimeout(() => {
          handleOpen();
        }, 2000);
        handleOpen()
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        UnAvailable Dates
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
        <Calendar
                    value={dateData}
                    onChange={changeDate}
                    minDate={currentDate}
                    tileContent={({ date, view }) => {
                      if (
                        view === "month" &&
                        dateData.some((selectedDate) =>
                          moment(selectedDate).isSame(date, "day")
                        )
                      ) {
                        // Apply inline styles to selected dates
                        return (
                          <div
                            style={{
                              backgroundColor: "#3498db", // Replace with the desired background color
                              color: "#ffffff", // Replace with the desired text color
                              borderRadius: "50%",
                              padding: "5px",
                            }}
                          ></div>
                        );
                      }
                    }}
                  />
          <p>
            Current selected date is{" "}
            <b>{moment(dateData).format("MMMM Do YYYY")}</b>
          </p>

          {/* Include other form fields here */}
          {/* Example input for the selected date */}
          <input
            type="hidden"
            name="date"
            value={moment(dateData).format("YYYY-MM-DD")}
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
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        <ToastContainer/>
      </Dialog>
    </>
  );
}
