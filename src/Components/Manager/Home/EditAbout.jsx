import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { EditIcon } from "@chakra-ui/icons";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  GenerateSuccess,
} from "../../../Validation/EventUpdation";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

export function EditAbout({ id, aboutdata }) {
  const [open, setOpen] = React.useState(false);
  const [about, setAbout] = useState("");
  const handleOpen = () => setOpen(!open);
  const queryclient = useQueryClient();
  const handleAbout = async () => {
    try {
      const res = await axiosManagerInstance.patch(`/editabout`, { id, about });
      if (res.data.status) {
        queryclient.invalidateQueries("managerdata");
        GenerateSuccess("About Updated Successfully");
        setTimeout(() => {
          handleOpen();
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    setAbout(aboutdata);
  }, []);

  return (
    <>
      <EditIcon
        className="w-5 h-5 p-2 ml-5 cursor-pointer"
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
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              About
            </Typography>
            <Input
              label="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleAbout}>
            send message
          </Button>
        </DialogFooter>
        <ToastContainer />
      </Dialog>
    </>
  );
}
