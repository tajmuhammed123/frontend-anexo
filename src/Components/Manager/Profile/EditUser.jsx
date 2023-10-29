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
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit } from "@mui/icons-material";
import { updateProfile } from "../../../actions/ManagerActions";
import { ProfileUpdate } from "../../../Validation/validation";
import { GenerateSuccess } from "../../../Validation/EventUpdation";

function EditUser({ user }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [loading, setLoading] = useState(false);
  const userInfoString = localStorage.getItem("managerInfo");
  const userInfo = JSON.parse(userInfoString);
  const initialValues = {
    name: userInfo.user.name,
    mob: userInfo.user.mob,
    id: userInfo.user._id,
  };
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
          values.name,
          userInfo.user._id,
          values.mob
        );
        console.log(data);
        setLoading(false);
        resetForm();
        if (data.status) {
          const managerInfoString = localStorage.getItem("managerInfo");
          const managerInfo = JSON.parse(managerInfoString) || {};
          managerInfo.user = data.user;
          const updatedManagerInfoString = JSON.stringify(managerInfo);
          localStorage.setItem("managerInfo", updatedManagerInfoString);
          GenerateSuccess("Profile Updated Successfully");
          queryClient.invalidateQueries("managerData");
          setTimeout(() => {
            handleOpen();
          }, 2000);
        }
      }
    },
  });
  console.log(values);

  //   if(loading ){
  //     return <div className='h-screen w-screen flex items-center justify-center'>
  //       <Spinner /></div>;
  // }
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
      </Dialog>
    </>
  );
}

export default EditUser;
