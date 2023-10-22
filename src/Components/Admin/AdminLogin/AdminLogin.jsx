import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { adminLogin,
} from '../../../actions/AdminActions';
import {
  Card,
  Input,
  Button,
  Typography,
  CardHeader,
  CardBody,
  Spinner,
} from "@material-tailwind/react";

import 'react-toastify/dist/ReactToastify.css'

function AdminLogIn() {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const [value,setValue]=useState({
      email: '',
    password: '',
    })
    const GenerateError = (err) => {
      toast.error(err, {
        position: 'top-center',
        theme: 'colored',
        autoClose: 3000
      });
    };
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const {email,password}=value
            if(!email){
              GenerateError('Email cannot be null')
            }else if(!password){
              GenerateError('Password cannot be null')
            }else{
                setLoading(true); // Show the spinner
                console.log(loading);
                const response= await dispatch(adminLogin(email,password))
                setLoading(false); 
                console.log(response);
                if(response.response){
                  toast(response.response.data.alert)
                }
                if(response.status){
                  localStorage.setItem('adminToken',response.token)
                  navigate('/admin/dashboard/')
                }
            }
        }catch(err){
            console.log(err.message)
        }
    }


  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="w-full max-w-[48rem] flex-row">
      <div className="flex flex-col sm:flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className={`m-0 imagewidth shrink-0 rounded-r-none`}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1661386039533-c638967d8e21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        
        <CardBody className="sm:w-full imagewidth">
          <Typography variant="h4" color="blue-gray">
            LogIn
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome Back
          </Typography>
          <form className="mt-8 mb-2 w-full max-w-[48rem] sm:w-[24rem]" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" name='email' value={value.email} onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} label="Email" />
              <Input type="password" name='password' value={value.password} onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} size="lg" label="Password" />
            </div>
            <Button className="mt-6" fullWidth type='submit' disabled={loading}>
            {loading ? <Spinner /> : 'Login'}
            </Button>
          </form>
        </CardBody>
      </div>
    </Card>
    <ToastContainer />
  </div>
  );
}

export default AdminLogIn;
