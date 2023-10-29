import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Tooltip,
  Input,
  IconButton,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { axiosUserInstance } from "../../../Constants/axios";
import { useQuery } from "@tanstack/react-query";
import CancelButton from "./ConfirmModel";
import Spinner from "../../../Spinner";
import { useState } from "react";

const TABLE_HEAD = ["Event Name", "Mobile No.", "Date", "Status", "Update"];

function OrderHistory() {
  const [data,setData]=useState([])
  const { isLoading, error } = useQuery(["bookinguser"], async () => {
    try {
      const userData = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      const response = await axiosUserInstance.get(
        `/orderdata/${userInfo.user._id}/1`,
        config
      );
      console.log(response.data.data);
        setData(response.data.data)
      return response.data.data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePagination=async(num)=>{
    try {
      const userData = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(userData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      const response = await axiosUserInstance.get(
        `/orderdata/${userInfo.user._id}/${num}`,
        config
      );
      setData(response.data.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex justify-center w-full">
      <Card className="h-full w-2/3 my-5">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Order Histroy
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about the last transactions
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              {/* <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button> */}
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-y-scroll px-2">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                console.log(item);

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {item.event_name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.mob}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {item.date.map((date, dateIndex) => (
                        <Typography
                          key={dateIndex}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(date).toLocaleDateString()}
                        </Typography>
                      ))}
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={item.is_paid}
                          color={
                            item.is_paid === "paid"
                              ? "green"
                              : item.is_paid === "not paid"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      {item.is_paid === "paid" ? (
                        <Tooltip content="Edit User">
                          <CancelButton id={item._id} />
                        </Tooltip>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" name="1" size="sm" onClick={(e)=>handlePagination(e.target.name)}>
            1
          </IconButton>
          <IconButton variant="text" name="2" size="sm" onClick={(e)=>handlePagination(e.target.name)}>
            2
          </IconButton>
          <IconButton variant="text" name="3" size="sm" onClick={(e)=>handlePagination(e.target.name)}>
            3
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
      </Card>
    </div>
  );
}

export default OrderHistory;
