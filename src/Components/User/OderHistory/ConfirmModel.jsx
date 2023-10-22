import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../../../actions/UserActions";
 
export default function CancelButton({id}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen((cur) => !cur);

  const queryClient=useQueryClient()

  const handleCancelOrder=async (id)=>{
    try {
      const res= await cancelOrder(id)
      if(res.status){
        queryClient.invalidateQueries(['bookinguser'])
      }
    } catch (error) {
      console.log(error.message);
    }
  }
 
  return (
    <>
      <Button onClick={handleOpen}>Cancel</Button>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Connect a Wallet
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="overflow-hidden flex justify-around pr-2">
        <Button onClick={()=>handleCancelOrder(id)}>Confirm</Button>
        <Button>Reject</Button>
        </DialogBody>
        <DialogFooter className="justify-between gap-2 border-t border-blue-gray-50">
          <Button variant="text" size="sm">
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}