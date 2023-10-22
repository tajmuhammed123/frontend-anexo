import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  Textarea,
  TabPanel,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  CardFooter,
  CardHeader,
  Card,
  alert,
} from '@material-tailwind/react';
import './SignUp.css';

import 'react-toastify/dist/ReactToastify.css'
import { managerReg } from '../../../actions/ManagerActions';

function ManagerSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: '',
    mob: '',
    email: '',
    password: '',
  });

  const GenerateError = (err) => {
    toast.error(err, {
      position: 'top-center',
      theme: 'colored',
      autoClose: 3000
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name,email,mob, password } = value;
      if (!email) {
        GenerateError('Your email cannot be null')
      } else if (!password) {
        GenerateError('Your password cannot be null')
      } else {
        console.log(value);
        const response= await dispatch(managerReg(name,email,mob, password))
        console.log(response);
        if (response.status) {
            toast('Check Your mail and verify')
        } else {
          navigate('/manager/signup');
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="main flex justify-center items-center" >
          <Card className="w-96">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                  <Input size="lg" label="Name" name='name' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
                  <Input size="lg" label="Mobile" name='mob' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
                  <Input size="lg" label="Email" name='email' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
                  <Input type="password" size="lg" label="Password" name='password' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} />
                </div>
                <Button variant="gradient" type='submit' fullWidth>
                  Sign Up
                </Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  onClick={()=>navigate('/manager/')}
                >
                  Sign In
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
      <ToastContainer />
    </div>
  );
}

export default ManagerSignUp;