import { Button, Card, Checkbox, Input, Typography } from '@material-tailwind/react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { BannnerUpdation } from '../../../Validation/validation';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosAdminInstance } from '../../../Constants/axios';
import { addBanner } from '../../../actions/AdminActions';

function AddBanner() {

    const queryClient = useQueryClient();
    const [data,setData]=useState([])
        const {id}=useParams()
        // useEffect(()=>{
        //     console.log('fdgg');
        //     console.log(id);
        //     axiosAdminInstance.get(`/getbannerdata/${id}`).then((res)=>{setData(res.data.banner.banner_text),console.log(res)})
            
        //   },[])
        const navigate=useNavigate()
        console.log(data);
    let initialValues = {
        banner_text:'',
        main_text:'',
        button_text:''
      }
      const {isLoading,error}=useQuery({
        queryKey:['bannerdata'],
        queryFn:()=>axiosAdminInstance.get(`/getbannerdata/${id}`).then((res)=>{
                initialValues.banner_text=res.data.banner?res.data.banner.banner_text:'',
                initialValues.main_text=res.data.banner?res.data.banner.main_text:'',
                initialValues.button_text=res.data.banner?res.data.banner.button_text:'',
            console.log(res.data.banner)})
      })
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
      validationSchema:BannnerUpdation,
      onSubmit: async (values,{resetForm}) => {
        console.log('sub');
        console.log(formData);
          if(values){
            console.log('hjds');
            await addBanner(formData)
            navigate('/admin/bannerlist')
              console.log(values);
              resetForm()
            //   queryClient.invalidateQueries("categorey");
          }
      }
    })
    const formData = new FormData()
    formData.append("banner_text", values.banner_text);
    formData.append("main_text", values.main_text);
    formData.append("banner_img", values.banner_img);
    formData.append("button_text", values.button_text);
    if(id!='null'){
        formData.append('id',id)
    }

  return (
    <div className='flex justify-center pt-5'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add Banner
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your Banner data
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
        <Input size="lg" name="banner_text" label="Main Text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.banner_text}
          />
          {touched.banner_text && errors.banner_text && (
            <div className="text-red-500 text-sm ">{errors.banner_text}</div>
          )}
          <Input size="lg" name="main_text" label="Main Text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.main_text}
          />
          {touched.main_text && errors.main_text && (
            <div className="text-red-500 text-sm ">{errors.main_text}</div>
          )}
          <Input type="file" size="lg" label="Banner image" name="banner_img"            
          onChange={(event) => {
              const selectedFile = event.currentTarget.files[0];
              console.log(selectedFile);
              setFieldValue("banner_img", selectedFile);
              const formData = new FormData();
              formData.append("banner_img", selectedFile)
            }}/>
            {touched.banner_img && errors.banner_img && (
            <div className="text-red-500 text-sm ">{errors.banner_img}</div>
          )}
        <Input size="lg" name="button_text" label="Button Text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.button_text}
          />
          {touched.button_text && errors.button_text && (
            <div className="text-red-500 text-sm ">{errors.button_text}</div>
          )}
        </div>
        <Button className="mt-6" fullWidth type='submit'>
          Add Banner
        </Button>
      </form>
    </Card>
    </div>
  )
}

export default AddBanner