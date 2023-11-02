import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { ProfileUpdate } from "../../../Validation/validation";
import { updateProfile } from "../../../actions/UserActions";
import { Updated } from "./Updated";
import { useNavigate } from "react-router-dom";

export function EditUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userInfoString = localStorage.getItem("userInfo");
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
        if (data.status) {
          setLoading(false);
          navigate("/profile");
          return <Updated />;
        }
        resetForm();
        queryClient.invalidateQueries("edituser");
      }
    },
  });

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex justify-center py-9">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit Profile
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Edit you profile
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
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
          <Button className="mt-6" fullWidth type="submit">
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
}
