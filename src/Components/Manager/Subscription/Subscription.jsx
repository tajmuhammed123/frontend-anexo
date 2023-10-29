import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { axiosManagerInstance } from "../../../Constants/axios";
import { ToastContainer, toast } from "react-toastify";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function Subscription() {
  const navigate = useNavigate();
  const handleSubscribe = async (name) => {
    const managerData = localStorage.getItem("managerInfo");
    const managerInfo = JSON.parse(managerData);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${managerInfo.token.token}`,
      },
    };
    const res = await axiosManagerInstance.get(
      `/handlesubscription/${managerInfo.user._id}`,
      config
    );
    if (res.data.status) {
      navigate(`/manager/subscriptionpayment/${name}`);
    } else {
      toast("You have already subscribed");
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <Card
          color="green"
          variant="gradient"
          className="w-full max-w-[17rem] p-8 m-5 h-fit"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              Classic
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-5xl font-normal"
            >
              <span className="mt-2 text-4xl">₹</span>1000{" "}
              {/* <span className="self-end text-4xl">/mo</span> */}
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">7 days</Typography>
              </li>
              {/* <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">200+ components</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">40+ built-in pages</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">1 year free updates</Typography>
            </li> */}
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Added to our Hot Events
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 p-0">
            <Button
              size="lg"
              color="white"
              className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
              ripple={false}
              fullWidth={true}
              onClick={() => handleSubscribe("classic")}
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>
        <Card
          color="red"
          variant="gradient"
          className="w-full max-w-[17rem] p-8 m-5 h-fit"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              Standard
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-5xl font-normal"
            >
              <span className="mt-2 text-4xl">₹</span>3000{" "}
              {/* <span className="self-end text-4xl">/mo</span> */}
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">1 Month</Typography>
              </li>
              {/* <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">200+ components</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">40+ built-in pages</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">1 year free updates</Typography>
            </li> */}
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Added to our Hot Events
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 p-0">
            <Button
              size="lg"
              color="white"
              className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
              ripple={false}
              fullWidth={true}
              onClick={() => handleSubscribe("standard")}
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>
        <Card
          color="gray"
          variant="gradient"
          className="w-full max-w-[17rem] p-8 m-5 h-fit"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              Premium
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-5xl font-normal"
            >
              <span className="mt-2 text-4xl">₹</span>7000{" "}
              {/* <span className="self-end text-4xl">/mo</span> */}
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">3 Months</Typography>
              </li>
              {/* <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">200+ components</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">40+ built-in pages</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">1 year free updates</Typography>
            </li> */}
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">
                  Added to our Hot Events
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 p-0">
            <Button
              size="lg"
              color="white"
              className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
              ripple={false}
              fullWidth={true}
              onClick={() => handleSubscribe("premium")}
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
}
