import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";
 
export function Updated() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // Automatically open the dialog when the component mounts
  useEffect(() => {
    handleOpen();
  }, []);

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Button onClick={handleOpen}>Notification</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Updatation
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <CheckIcon />
          <Typography color="red" variant="h4">
            Your Profile has been Updated
          </Typography>
          <Button onClick={() => navigate("/")}>Home</Button>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" onClick={handleOpen}>
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
