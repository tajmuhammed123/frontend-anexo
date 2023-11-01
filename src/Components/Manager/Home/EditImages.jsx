import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { EditIcon } from "@chakra-ui/icons";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import {
  BookingImageUpdate,
  ImageUpdate,
} from "../../../Validation/validation";
import { GenerateSuccess } from "../../../Validation/EventUpdation";

export function EditImages({ images }) {
  const [data, setEventdata] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = useState([]);

  //   const [data,setEventdata]=useState([])
  const userInfoString = localStorage.getItem("managerInfo");

  const userInfo = JSON.parse(userInfoString);

  const handleOpen = () => setOpen(!open);
  const queryclient = useQueryClient();


  const handleImages = async (e) => {
    try {
      const selectedFiles = e.currentTarget.files;
      const fileArray = Array.from(selectedFiles);
      setImg(...fileArray);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteImage = (index, event) => {
    event.preventDefault();
    const updatedImg = [...img];
    updatedImg.splice(index, 1);
    setImg(updatedImg);
    console.log(img);
  };

  const initialValues = {
    profile: [],
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
    validationSchema: BookingImageUpdate,
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
        const res = await axiosManagerInstance.patch(
          `/editimages`,
          formData,
          config
        );
        resetForm();
        if (res.data.status) {
          GenerateSuccess("Image Updated Successfully");
          queryclient.invalidateQueries("managerData");
          setTimeout(() => {
            handleOpen();
          }, 2000);
        }
      }
    },
  });
  const formData = new FormData();
  for (let i = 0; i < values.profile.length; i++) {
    formData.append("profile", values.profile[i]);
  }
  formData.append("id", userInfo.user._id);
  useEffect(() => {
    console.log(values);
  }, [values]);
  useEffect(() => {
    setImg(images);
  }, []);


  return (
    <>
      <EditIcon
        className="w-5 h-5 p-2 ml-3 cursor-pointer"
        onClick={handleOpen}
      />
      <Dialog open={open} size="xs" handler={handleOpen}>
        <form>
          <div className="flex items-center justify-between">
            <DialogHeader className="flex flex-col items-start">
              {" "}
              <Typography className="mb-1" variant="h4">
                Update Images
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
              <Input
                label="Img"
                name="profile"
                type="file"
                multiple
                onChange={(event) => {
                  const selectedFile = event.currentTarget.files;
                  setFieldValue("profile", selectedFile);
                  setImg([...selectedFile]);
                }}
              />
              {/* {img && img.map((file, index) => (
  <div className="img-container" key={index}>
    <img
      src={file instanceof File ? URL.createObjectURL(file) : file}
      alt={`Image ${index + 1}`}
    />
    <button
      className="cross-icon flex items-center justify-center"
      onClick={() => handleDeleteImage(index)}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </div>
))} */}
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="gray" onClick={handleOpen}>
              cancel
            </Button>
            <Button
              variant="gradient"
              type="submit"
              color="gray"
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
