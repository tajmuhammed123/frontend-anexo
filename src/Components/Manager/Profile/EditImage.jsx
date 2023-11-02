import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Avatar,
  Badge,
} from "@material-tailwind/react";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useFormik } from "formik";
import { ImageUpdate } from "../../../Validation/validation";
import { Edit } from "@mui/icons-material";
import { GenerateSuccess } from "../../../Validation/EventUpdation";

export function EditImage({ id, img }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const initialValues = {
    profile: "",
  };

  const {
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ImageUpdate,
    onSubmit: async (values, { resetForm }) => {
      if (values) {
        const userData = localStorage.getItem("managerInfo");
        const userInfo = JSON.parse(userData);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token.token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const res = await axiosManagerInstance.post(
          `/editprofilephoto`,
          formData,
          config
        );
        if (res.data.status) {
          GenerateSuccess("Image Updated Successfully");
          resetForm();
          setTimeout(() => {
            handleOpen();
          }, 2000);
        }
      }
    },
  });

  const formData = new FormData();
  formData.append("profile", values.profile);
  formData.append("id", id);

  return (
    <>
      <Badge
        overlap="circular"
        placement="bottom-end"
        className="w-12 h-12 bg-black"
        onClick={handleOpen}
        content={<Edit />}
      >
        <Avatar
          size="lg"
          variant="circular"
          src={
            img
              ? img
              : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          }
          alt="tania andrew"
          className="mb-2 w-40 h-40"
        />
      </Badge>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Edit Image
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
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div className="grid gap-6">
              <Typography className="-mb-1" color="blue-gray" variant="h6">
                Image
              </Typography>
              <Input
                label="Img"
                name="profile"
                type="file"
                onChange={(event) => {
                  const selectedFile = event.currentTarget.files[0];
                  setFieldValue("profile", selectedFile);
                  const formData = new FormData();
                  formData.append("profile", selectedFile);
                }}
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="gray" onClick={handleOpen}>
              cancel
            </Button>
            <Button
              variant="gradient"
              color="gray"
              type="submit"
              onClick={handleSubmit}
            >
              send message
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
