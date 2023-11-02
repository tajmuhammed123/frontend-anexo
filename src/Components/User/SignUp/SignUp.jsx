import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userReg } from "../../../actions/UserActions";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  Input,
  Button,
  Typography,
  CardHeader,
  CardBody,
  Spinner,
} from "@material-tailwind/react";
import "./SignUp.css";

import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: "",
    mob: "",
    email: "",
    password: "",
  });

  const GenerateError = (err) => {
    toast.error(err, {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, mob, email, password } = value;
      if (!email) {
        GenerateError("Your email cannot be null");
      } else if (!password) {
        GenerateError("Your password cannot be null");
      } else if (password.length < 5) {
        GenerateError("Your password must be above 5");
      } else {
        setLoading(true);
        const response = await dispatch(userReg(name, mob, email, password));
        console.log(response);
        setLoading(false);
        if (response) {
          toast(response.alert);
          if(response.response){
            GenerateError(response.response.data.alert)
          }
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="main flex justify-center items-center h-screen">
      <Card className="w-full max-w-[48rem] flex-row">
        <div className="flex flex-col sm:flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className={`m-0 imagewidth shrink-0 rounded-r-none`}
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="sm:w-full imagewidth">
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to register.
            </Typography>
            <form
              className="mt-8 mb-2 w-full max-w-[48rem] sm:w-[24rem]"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Name"
                  name="name"
                  onChange={(e) =>
                    setValue({ ...value, [e.target.name]: e.target.value })
                  }
                />
                <Input
                  size="lg"
                  label="Mobile"
                  name="mob"
                  onChange={(e) =>
                    setValue({ ...value, [e.target.name]: e.target.value })
                  }
                />
                <Input
                  size="lg"
                  label="Email"
                  name="email"
                  onChange={(e) =>
                    setValue({ ...value, [e.target.name]: e.target.value })
                  }
                />
                <Input
                  type="password"
                  size="lg"
                  label="Password"
                  name="password"
                  onChange={(e) =>
                    setValue({ ...value, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <Button className="mt-6" fullWidth type="submit">
                {loading ? (
                  <Spinner className="flex justify-center" />
                ) : (
                  "Register"
                )}
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={() => navigate("/login")}
                  className="font-medium text-gray-900"
                >
                  Sign In
                </a>
              </Typography>
            </form>
          </CardBody>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
