import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { updateProfile } from "../../../actions/UserActions";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileUpdate } from "../../../Validation/validation";
import { Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { GenerateSuccess } from "../../../Validation/EventUpdation";
import { ToastContainer } from "react-toastify";

function EditUser({ user }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const initialValues = {
    name: userInfo.user.name,
    mob: userInfo.user.mob,
    id: userInfo.user._id,
  };
  console.log(initialValues);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ProfileUpdate,
    onSubmit: async (values, { resetForm }) => {
      if (values) {
        setLoading(true);
        let { data } = await updateProfile(
          userInfo.user._id,
          values.name,
          values.mob
        );
        console.log(data);
        if (data.status) {
          setLoading(false);
          GenerateSuccess("Image Updated Successfully");
            resetForm();
            setTimeout(() => {
              handleOpen();
            }, 2000);
        }
        resetForm();
        queryClient.invalidateQueries("userData");
        handleOpen();
      }
    },
  });
  console.log(values);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Edit onClick={handleOpen} />
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Edit Profile
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
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <DialogBody>
            <div className="grid gap-6">
              <Typography color="gray" className="mt-1 font-normal">
                Edit you profile
              </Typography>
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  name="name"
                  label="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {/* <Input size="lg" name="email" label="Email" onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} />
                {touched.email && errors.email && (
            <div className="text-red-500 text-sm ">{errors.email}</div>
          )} */}
                <Input
                  size="lg"
                  name="mob"
                  label="Moblie Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mob}
                />
                {touched.mob && errors.mob && (
                  <div className="text-red-500 text-sm ">{errors.mob}</div>
                )}
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="gray" onClick={handleOpen}>
              cancel
            </Button>
            <Button className="mt-6" fullWidth type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
        <ToastContainer/>
      </Dialog>
    </>
  );
}

export default EditUser;
