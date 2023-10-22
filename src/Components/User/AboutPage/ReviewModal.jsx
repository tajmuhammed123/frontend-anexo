import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Rating,
} from "@material-tailwind/react";
import { axiosUserInstance } from "../../../Constants/axios";
import { ToastContainer, toast } from "react-toastify";
 
export function ReviewModal({id}) {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(true);
 
  const handleOpen = () => setOpen(!open);
  const [rating, setRating] = useState(0);
  const [content,setContent]=useState('')
  useEffect(()=>{
    console.log(rating);
  },[rating])

  const handleRatingChange = (newRating) => {
    console.log(newRating,'new');
    setRating(newRating);
  }
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if(!user){
        setUser(false)
    }
  },[user])

  const handleSubmit=async()=>{
    try {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        console.log(user);
        const userId=user.user._id
        console.log(id);
        const managId=id
        if(!content){
          toast('Content Cannot be null')
        }else if(rating==0){
          toast('Add rating')
        }else{
          const userData=localStorage.getItem('userInfo')
          const userInfo=JSON.parse(userData)
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userInfo.token.token}`,
                },
              };
          const {data}=await axiosUserInstance.post('/submitreview',{content,rating,managId,userId},config)
          console.log(data);
          if(data.message){
              handleOpen()
              toast(data.message)
          }else if(data.status){
              handleOpen()
          }
        }
        console.log(rating,'rslt');
    } catch (error) {
        console.log(error.message);
    }
  }
 
  return (
    <>
      <Button onClick={handleOpen}>Add Your Review</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Add Your Review</DialogHeader>
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
        {user?<DialogBody divider>
          <div className="grid gap-6">
            <Rating
                value={rating}
                onChange={handleRatingChange}
            />
            <Textarea label="Message" onChange={(e)=>setContent(e.target.value)}/>
          </div>
        </DialogBody>:<h1 className="flex justify-center py-5">Please login to review</h1>}
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer/>
    </>
  );
}