import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { userLogin,
  forgotPassword,
  forgotPasswordVerify,
  userGoogleLogin
} from '../../../actions/UserActions';
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
import axios from 'axios';
import { managerLogin } from '../../../actions/ManagerActions';

function LogIn() {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const forgotPasswordData = useSelector((state) => state.forgotPassword);
    console.log(forgotPasswordData);
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
    const [reset, setReset] = useState(false);
    const [otpSent, setSentOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false)

    const handleOtp= async(e)=>{
      e.preventDefault();
      const {email}=value
      let frgt=await dispatch(forgotPassword(email));
      if(frgt.status){
        setSentOtp(true)
      }else{
        setSentOtp(false)
      }
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { email, password } = value;
        if (!email) {
          GenerateError('Email cannot be null');
        } else if (!password) {
          GenerateError('Password cannot be null');
        } else {
          setLoading(true); // Show the spinner
          console.log(loading);
          const response = await dispatch(managerLogin(email, password));
          setLoading(false); // Hide the spinner when the response is received
          console.log(loading);
          console.log(response);
          if (response.response) {
            toast(response.response.data.alert);
          }
          if (response.status) {
            localStorage.setItem('managertoken', response.token);
            navigate('/manager/');
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    const handleForgot = async(e) => {
      const {email,password}=value
      e.preventDefault();
      await dispatch(forgotPasswordVerify(email, otp, password));
      setOtp("");
      setValue('')
      if (forgotPasswordData.message.status) {
        setReset(false);
        setSentOtp(false);
        setValue('')
        toast('Your password reset succefully')
      } else {
        setSentOtp(false);
      }
    };


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
        {reset ?<CardBody className="sm:w-full imagewidth">
          <Typography variant="h4" color="blue-gray">
            Reset Password
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Email and OTP.
          </Typography>
          {otpSent?<form className="mt-8 mb-2 w-full max-w-[48rem] sm:w-[24rem]" onSubmit={handleForgot}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" name='otp' onChange={(e) => setOtp(e.target.value)} value={otp} label="OTP" />
              <Input size="lg" type='password' name='password' value={value.password} onChange={(e) => setValue({...value,[e.target.name]:e.target.value})} label="Pass" />
            </div>
            <Button className="mt-6" fullWidth type='submit'>
              Verify
            </Button>
          </form>:<form className="mt-8 mb-2 w-full max-w-[48rem] sm:w-[24rem]" onSubmit={handleOtp}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" name='email' value={value.email} onChange={(e) => setValue({...value,[e.target.name]:e.target.value})} label="Email" />
            </div>
            <Button className="mt-6" fullWidth type='submit'>
              Get OTP
            </Button>
          </form>}
        </CardBody>:
        <CardBody className="sm:w-full imagewidth">
          <Typography variant="h4" color="blue-gray">
            Manager LogIn
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome Back
          </Typography>
          <form className="mt-8 mb-2 w-full max-w-[48rem] sm:w-[24rem]" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" name='email' value={value.email} onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} label="Email" />
              <Input type="password" name='password' value={value.password} onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} size="lg" label="Password" />
            </div>
            <div>
            </div>
            <Button className="mt-6" fullWidth type='submit'  disabled={loading}>
              {loading ? <Spinner /> : 'Login'}
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              <a href="#" className="font-medium text-gray-900" onClick={()=>setReset(true)}>
                Forgot Password?
              </a>
            </Typography>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{' '}
              <a onClick={()=>navigate('/manager/signup')} className="font-medium text-gray-900">
                Sign Up
              </a>
            </Typography>
          </form>
        </CardBody>}
      </div>
    </Card>
    <ToastContainer />
  </div>
  );
}

export default LogIn;
