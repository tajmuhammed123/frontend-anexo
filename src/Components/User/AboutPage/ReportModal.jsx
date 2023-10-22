import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { axiosUserInstance } from "../../../Constants/axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
 
export function ReportModal({id}) {
  const [open, setOpen] = React.useState(false);
  const [report, setReport] = useState('');
  const [send, setSend] = useState(false);

  const handleReport=async(req,res)=>{
    try {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        console.log(user);
        const userId=user.user._id
        const managId=id
        if(!report){
          toast('Report Cannot Be Null')
        }else{
          const userData=localStorage.getItem('userInfo')
          const userInfo=JSON.parse(userData)
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userInfo.token.token}`,
                },
              };
          const {data}=await axiosUserInstance.post('/submitreport',{report,managId,userId},config)
          if(data.message){
              toast(data.message)
          }else if(data.status){
              setSend(true)
          }
        }
    } catch (error) {
        console.log(error.message);
    }
  }
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen}>Report</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Report Manager</DialogHeader>
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
        {send?<p>Reported Successfully</p>:<DialogBody divider>
          <div className="grid gap-6">
            <Textarea label="Issue" onChange={(e)=>setReport(e.target.value)} />
          </div>
        </DialogBody>}
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="green" onClick={handleReport}>
            Submit
          </Button>
        </DialogFooter>
        <ToastContainer/>
      </Dialog>
    </>
  );
}