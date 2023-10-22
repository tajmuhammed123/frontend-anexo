import { useEffect } from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
    Radio,
  } from "@material-tailwind/react";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosUserInstance } from '../../../Constants/axios';
import { EventSubmit } from '../../../actions/UserActions';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Payment from './Payment/Payment';
import Calendar from 'react-calendar';

function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-full w-full scale-105"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

function EventBooking() {
    const {id}=useParams()
    const [data,setData]=useState([])
    const [excludedDates,setExcludedDates]=useState([])
    const fetchData = async () => {
      try {
        await axiosUserInstance.get(`/managerdata/${id}`).then((res)=>setData(res.data.data)).catch((err)=>console.log(err.message));
        setExcludedDates(data.booked_dates)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
        fetchData()
        
        console.log('heyy');
      },[]);

      const userInfoString = localStorage.getItem("userInfo");

      const userInfo = JSON.parse(userInfoString)
    console.log(data);
    let eventsdata
    if (data.eventData && data.eventData.events) {
        eventsdata = data.eventData.events;
      }
    const navigate = useNavigate();
    const [eventdata, setEventData] = useState({
      manager_id:id,
      user_id:userInfo.user._id,
      name: '',
      event_name: '',
      mob: '',
      event:'',
      preffered_dishes: '',
      address:'',
      date: [],
      time: '',
      additional_data: '',
    });
    const eventArray=[]
    for(const key in eventsdata){
        if(data.eventData.events){
            eventArray.push(eventsdata[key])
        }
    }
    console.log(eventArray);

    console.log(moment(eventdata.date).format('MMMM Do YYYY'));
    const handleSubmit = async (e) => {
        e.preventDefault();
            console.log(eventdata);
            const response= await EventSubmit(eventdata)
            console.log(response);
            if (response.user.is_paid) {
              navigate('/success');
            } else {
              navigate(`/payment`);
            }
      }
      const currentDate = new Date();
      console.log(excludedDates);
    const tileDisabled = ({ date }) => {
      return excludedDates.some(excludedDate =>
        moment(excludedDate).isSame(date, 'day')
      );
    }

    const changeDate = (e) => {
      const selectedDate = e;
      const dateIndex = eventdata.date.findIndex((date) =>
        moment(date).isSame(selectedDate, 'day')
      );
    
      if (dateIndex === -1) {
        // Date is not in the array, so add it
        setEventData((prevEventData) => ({
          ...prevEventData,
          date: [...prevEventData.date, selectedDate],
        }));
      } else {
        // Date is in the array, so remove it
        setEventData((prevEventData) => ({
          ...prevEventData,
          date: prevEventData.date.filter((date) =>
            !moment(date).isSame(selectedDate, 'day')
          ),
        }));
      }
    };    
    

  return (
    <div className=''>

        <div className='flex justify-center items-center' >
            <div>  
        <Card color="transparent" className='m-0 grid place-items-center shadow-lg rounded-b-none py-8 px-4 text-center' floated={false} shadow={false} style={{border:'1px solid grey-50'}}>
        <Typography variant="h4" color="blue-gray">
            Event Booking
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Book Event.
        </Typography>
        <form className="mt-8 mb-2 w-400 max-w-screen-lg sm:w-200" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4 flex flex-col gap-6">
                <div className='flex flex-row gap-2 justify-center'>
                <Input size="lg" label="Name" name='name' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} required />
                <Input size="lg" label="Event Name" name='event_name' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} required />
                </div>
                <Input size="lg" label="Mobile Number" name='mob' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} required />
            <div className='flex flex-wrap w-full'>
                <Input size="lg" label="Preffered Dishes" name='preffered_dishes' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} required />
                <Input size="lg" label="Address" name='address' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} required />
            <div className="flex gap-10">
                {eventArray.map((data,index)=>(<Radio
                    key={index}
                    name='event'
                    value={data}
                    onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})}
                    ripple={false}
                    icon={<Icon />}
                    className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                    label={
                    <Typography color="blue-gray" className="font-normal">
                        {data}
                    </Typography>
                    } required
                />))}
            </div>
            </div>
                <div className='flex flex-row gap-2 justify-center'>
                <Calendar
                  value={eventdata.date}
                  onChange={changeDate}
                  tileDisabled={tileDisabled}
                  minDate={currentDate}
                  tileContent={({ date, view }) => {
                    if (view === 'month' && eventdata.date.some(selectedDate => moment(selectedDate).isSame(date, 'day'))) {
                      // Apply inline styles to selected dates
                      return (
                        <div
                          style={{
                            backgroundColor: '#3498db', // Replace with the desired background color
                            color: '#ffffff', // Replace with the desired text color
                            borderRadius: '50%',
                            padding: '5px',
                          }}
                        >
                        </div>
                      );
                    }
                  }}
                />

                {/* <p>Current selected dates are:</p>
                <ul>
                  {eventdata.date.map((selectedDate, index) => (
                    <li key={index}>{moment(selectedDate).format('MMMM Do YYYY')}</li>
                  ))}
                </ul> */}
                {/* Include other form fields here */}
                {/* Example input for the selected date */}
                <input
                  type="hidden"
                  name="date"
                  value={eventdata.date.map((date) => moment(date).format('YYYY-MM-DD')).join(',')}
                />
                <Input size="lg" label="Time" name="time" onChange={(e) => setEventData({ ...eventdata, [e.target.name]: e.target.value })} required />
              </div>
              <p>Selected dates: </p>
              <div className='flex flex-row'>
                {eventdata.date.map((selectedDate, index) => (
                    <p key={index}>
                      {index + 1}:{' '}
                      <b>{moment(selectedDate).format('MMMM Do YYYY')}</b>
                    </p>
                  ))}
              </div>
            <Textarea size="lg" label="Additional Details" name='additional_data' onChange={(e)=>setEventData({...eventdata,[e.target.name]:e.target.value})} />
          </div>
          <Button className="mt-6" fullWidth type='submit'>
            Book Slot
          </Button>
        </form>
        </Card>
        <ToastContainer />
        </div>
        </div>
    </div>
  )
}

export default EventBooking