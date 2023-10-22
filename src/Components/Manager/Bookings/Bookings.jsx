// import { Avatar, Button, Card, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
// import React from 'react'
// import { axiosManagerInstance } from '../../../Constants/axios';
// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function Bookings() {
//     const {manager}=useSelector(state=>state.managerInfo)
//     const [data,setData]=useState([])
//     const [open, setOpen] = React.useState(false);
 
//     const handleOpen = (index) => {
      
//       setOpen(!open)
//       const newDialogOpen = [...dialogOpen];
//       newDialogOpen[index] = !newDialogOpen[index];
//       setDialogOpen(newDialogOpen)
//     };
//     const [dialogOpen, setDialogOpen] = useState(new Array(data.length).fill(false))
//     const { isLoading, error } = useQuery({
//         queryKey: ['bookingdata'],
//         queryFn: async () => {
//           try {
//             const managerData=localStorage.getItem('managerInfo')
//             const managerInfo=JSON.parse(managerData)
//             const config = {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${managerInfo.token.token}`,
//               },
//             };
//             const response = await axiosManagerInstance.get(`/bookingdata/${manager.user._id}`,config);
//             console.log(response);
//             setData(response.data.data);
//             console.log(response.data.data);
//           } catch (err) {
//             console.error(err.message);
//             // Handle error here
//           }
//         },
//       });
//       const navigate=useNavigate()
//   return (
//     <div className='h-screen justify-center align-middle flex'>
//         <Card className="w-96 m-9">
//           <CardHeader>
//             <Typography variant="h4" color="blue-gray" className='flex justify-center'>
//               Event Bookings
//             </Typography>
//           </CardHeader>
//             <List>
//               {data.length > 0?data.map((item, index) => (
//                 <>
//                 <ListItem key={index} onClick={()=>navigate(`/manager/bookinguser/${item._id}`)}>
//                   <ListItemPrefix>
//                     <Avatar variant="circular" alt="candice" src="https://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-16.png" />
//                   </ListItemPrefix>
//                   <div>
//                     <Typography variant="h6" color="blue-gray">
//                       {item.event_name}
//                     </Typography>
//                     <Typography variant="small" color="gray" className="font-normal">
//                     {item.mob}
//                     </Typography>
//                   </div>
//                 </ListItem>
                {/* <Dialog
                open={dialogOpen[index]}
                handler={handleOpen}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0.9, y: -100 },
                }}
              >
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody divider>
                  <p ><strong>Name:</strong>{item.event_name} </p>
                  <p ><strong>Moblie:</strong>{item.mob}</p>
                  <p ><strong>Event:</strong>{item.event}</p>
                  <p ><strong>Dishes:</strong>{item.preffered_dishes}</p>
                  <p ><strong>Address:</strong>{item.address}</p>
                  <p ><strong>Date:</strong>{item.date}</p>
                  <p ><strong>Time:</strong>{item.time}</p>
                  <p ><strong>Additional Data:</strong>{item.additional_data}</p>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={()=>handleOpen(index)}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" onClick={()=>handleOpen(index)}>
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog> */}
              {/* </>
              )) : <Typography className='flex justify-center' variant="h6" color="blue-gray">
              No bookings
            </Typography>}
            </List>
        </Card>
    </div>
  )
} */}

// export default Bookings


import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Input,
  TabsHeader,
  Tabs,
  Tab,
} from "@material-tailwind/react";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

 
function Bookings() {

  const {manager}=useSelector(state=>state.managerInfo)
  const [datalist,setData]=useState([])
  const [payment,setPayment]=useState('paid')
  const [searchInput,setSearchInput]=useState('')

const paidstatus = datalist.filter(item => {
  const nameMatch = item.is_paid==payment
  return nameMatch ;
})
const data = paidstatus.filter(item => {
  const searchInputLower = searchInput.toLowerCase();
  const nameMatch = item.event_name.toLowerCase().includes(searchInputLower);
  return nameMatch ;
})
const { isLoading, error } = useQuery({
  queryKey: ['bookingdata'],
  queryFn: async () => {
    try {
      const managerData=localStorage.getItem('managerInfo')
      const managerInfo=JSON.parse(managerData)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${managerInfo.token.token}`,
        },
      };
      const response = await axiosManagerInstance.get(`/bookingdata/${manager.user._id}`,config);
      console.log(response);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error(err.message);
      // Handle error here
    }
  },
});
const TABS = [
  {
    label: "Not Paid",
    value: "not paid",
  },
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "Pending",
    value: "pending",
  },
];
const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

const TABLE_ROWS = data.length > 0
? data.map((item, index) => ({
    img: item.user_id.profile_img,
    name: item.event_name,
    amount: "$2,500",
    date: item.date && 
      item.date.map((item, index) => (
          <div key={index}>
          {new Date(item).toDateString()}
          </div>
      )),
    is_paid: item.is_paid,
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  }))
: [];
  return (
    <div>
    <Card className="h-full w-1/2">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            {/* <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button> */}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full ">
            <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={() => {
                setPayment(value);
                console.log(value); // Use value directly
              }}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              onChange={(e)=>setSearchInput(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  img,
                  name,
                  amount,
                  date,
                  is_paid,
                  account,
                  expiry,
                },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={img}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {amount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                      <Chip
                size="lg"
                variant="ghost"
                value={is_paid}
                color={
                is_paid =='paid'
                    ? "green"
                    : is_paid === "pending"
                    ? "amber"
                    : "red"
                }
            />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                          <Avatar
                            src={
                              account === "visa"
                                ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                            }
                            size="sm"
                            alt={account}
                            variant="square"
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {expiry}
                          </Typography>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}

export default Bookings;