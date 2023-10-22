import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ProfileUpdate } from "../../../Validation/validation";
import { Updated } from "./Updated";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../actions/ManagerActions";
   
  export function EditManager() {
    const queryClient = useQueryClient();
    const navigate=useNavigate()

    
    const userInfoString = localStorage.getItem("managerInfo");
    
    const userInfo = JSON.parse(userInfoString)
    const initialValues = {
        name:userInfo.user.name,
        mob:userInfo.user.mob,
        id:userInfo.user._id,
        profile_img:''
      }
      const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue
      } = useFormik({
          initialValues:initialValues,
        validationSchema:ProfileUpdate,
        onSubmit: async (values,{resetForm}) => {
            console.log(values);
            console.log('sub');
            console.log(formData);
            if(values){
                let {data}=await updateProfile(formData)
                console.log(data);
                if(data.status){
                  localStorage.setItem('managerInfo',JSON.stringify({user:data.user}))
                    navigate('/manager/profile')
                    return <Updated/>
                }
                resetForm()
                queryClient.invalidateQueries("editmanager");
            }
        }
    })
    const formData = new FormData()
    formData.append("name", values.name);
    formData.append("id", userInfo.user._id);
    formData.append("mob", values.mob);
    formData.append("profile_img", values.profile_img);
    return (
    <div className="flex justify-center py-9">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit Profile
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Edit you profile
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" name="name" label="Name" onChange={handleChange}
          onBlur={handleBlur}
          value={values.name} />
            {/* <Input size="lg" name="email" label="Email" onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} />
                {touched.email && errors.email && (
            <div className="text-red-500 text-sm ">{errors.email}</div>
          )} */}
            <Input size="lg" name="mob" label="Moblie Number" onChange={handleChange}
                onBlur={handleBlur}
                value={values.mob} />
                {touched.mob && errors.mob && (
            <div className="text-red-500 text-sm ">{errors.mob}</div>
          )}
            <Input type="file" size="lg" name="profile_img" label="Profile Picture" onChange={(e)=>{
                const selectedFile = e.currentTarget.files[0];
                console.log(selectedFile);
                setFieldValue("profile_img", selectedFile)
                formData.append("profile_img", selectedFile)
            }} />
            {touched.profile_img && errors.profile_img && (
            <div className="text-red-500 text-sm ">{errors.profile_img}</div>
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