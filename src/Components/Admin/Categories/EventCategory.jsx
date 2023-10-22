import { useFormik } from "formik";
import { CategoreySchema } from "../../../Validation/validation";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addEventCategorey } from "../../../actions/AdminActions";

function EventCategory() {
    const queryClient = useQueryClient();
  
    
    const initialValues = {
      categorey:"",
      description:"",
      eventlogo:''
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
      validationSchema:CategoreySchema,
      onSubmit: async (values,{resetForm}) => {
        console.log('sub');
        console.log(formData);
          if(values){
            await addEventCategorey(formData)
              console.log(values);
              resetForm()
              queryClient.invalidateQueries("categorey");
          }
      }
    })
    const formData = new FormData()
    formData.append("categorey", values.categorey);
    formData.append("description", values.description);
    // for (let i = 0; i < values.eventlogo.length; i++) {
    //     formData.append("eventlogo", values.eventlogo[i]);
    //   }
    formData.append("eventlogo", values.eventlogo);
    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  return (
    <div className="flex justify-center pt-5">
      <div className="flex-col">

      <Typography variant="h3" color="black" className="uppercase flex justify-center pb-5">
        Add Categorey
      </Typography>
      
        <Card color="transparent" shadow={false}>
      <Typography color="gray" className="mt-1 font-normal flex justify-center">
        Enter your Categorey details to add.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" name="categorey"         
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.categorey} />
          {touched.categorey && errors.categorey && (
            <div className="text-red-500 text-sm ">{errors.categorey}</div>
          )}
          <Input size="lg" name="description" label="Description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          />
          {touched.description && errors.description && (
            <div className="text-red-500 text-sm ">{errors.description}</div>
          )}
          <Input type="file" size="lg" label="Add image" name="eventlogo"            
          onChange={(event) => {
              const selectedFile = event.currentTarget.files[0];
              console.log(selectedFile);
              setFieldValue("eventlogo", selectedFile);
          
              
              const formData = new FormData();
              formData.append("eventlogo", selectedFile)

            //   for (let i = 0; i < selectedFiles.length; i++) {
            //     formData.append("eventlogo", selectedFiles[i]);
            //   }
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
              }
            }}/>
            {touched.eventlogo && errors.eventlogo && (
            <div className="text-red-500 text-sm ">{errors.eventlogo}</div>
          )}
        </div>
        <Button className="mt-6" fullWidth type="submit">
          Add Categorey
        </Button>
      </form>
    </Card>
    </div>
    </div>
  )
}

export default EventCategory