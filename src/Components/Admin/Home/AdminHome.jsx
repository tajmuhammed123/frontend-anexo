import { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { axiosAdminInstance } from "../../../Constants/axios";
import { ManagerApprove, ManagerReject } from "../../../actions/AdminActions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../../Spinner";

function AdminHome() {
  const [managerData, setData] = useState([]);

  const [search, setSearch] = useState('');
  const TABLE_ROWS = managerData.map((item) => ({
    name: item.name,
    amount: item.eventData.salutation,
    status: item.is_authorized,
  }));
  const handleApprove = async (id) => {
    try {
      ManagerApprove(id);
      queryClient.invalidateQueries("manager");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleReject = async (id) => {
    try {
      ManagerReject(id);
      queryClient.invalidateQueries("manager");
    } catch (error) {
      console.log(error.message);
    }
  };

  const TABLE_HEAD = ["Manager ID", "User ID", "Employed", "", "", ""];

  const queryClient = useQueryClient();

  const handleData = async (num) => {
    try {
      fetchData(num);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async (num) => {
    const userData = localStorage.getItem("adminInfo");
    const userInfo = JSON.parse(userData);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    };

    try {
      const response = await axiosAdminInstance.get(
        `/getmanagerdata/${num}`,
        config
      );
      setData(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };

  const { isLoading } = useQuery(["manager"], () => fetchData(1));

  if (isLoading) {
    return <Spinner />;
  }


  const handleManangerSearch=async()=>{
    try {
      await axiosAdminInstance.get(`/searchmanager/${search}`).then((res)=>setData(res.data.user))
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="m-5 flex justify-center flex-col">
        <div className="flex justify-center">
          <Typography variant="h2">MANAGER APPROVALS</Typography>
        </div>
        <div className="flex justify-center">
          <Card className="h-full w-2/3">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Manager Approvals
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    These are manager requests to approve
                  </Typography>
                </div>
                <div className="relative flex w-full gap-2 md:w-max">
                  <Input
                    type="search"
                    label="Type here..."
                    className="pr-20"
                    containerProps={{
                      className: "min-w-[288px]",
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button size="sm" className="!absolute right-1 top-1 rounded" onClick={handleManangerSearch}>
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-hidden px-0">
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
                  {managerData.map((item, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={item._id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {item.name}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.eventData.salutation}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.eventData.location}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max flex justify-center">
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={item.is_authorized ? "Apporved" : "N/A"}
                              color={
                                item.is_authorized
                                  ? "green"
                                  : item.is_authorized === "pending"
                                  ? "amber"
                                  : "red"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {/* <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                          <Avatar
                            src={
                              item.eventData.dishes === "visa"
                                ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                            }
                            size="sm"
                            alt={item.eventData.dishes}
                            variant="square"
                            className="h-full w-full object-contain p-1"
                          />
                        </div> */}
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal capitalize"
                              >
                                {item.eventData.name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {item.eventData.name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Approve">
                            <Button
                              color="green"
                              className="mr-3"
                              onClick={() => handleApprove(item._id)}
                            >
                              Approve
                            </Button>
                          </Tooltip>
                          <Tooltip content="Reject">
                            <Button
                              color="red"
                              onClick={() => handleReject(item._id)}
                            >
                              Reject
                            </Button>
                          </Tooltip>
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
                <IconButton
                  variant="outlined"
                  size="sm"
                  value={1}
                  onClick={(e) => handleData(e.target.value)}
                >
                  1
                </IconButton>
                <IconButton
                  variant="text"
                  size="sm"
                  value={2}
                  onClick={(e) => handleData(e.target.value)}
                >
                  2
                </IconButton>
                <IconButton
                  variant="text"
                  size="sm"
                  value={3}
                  onClick={(e) => handleData(e.target.value)}
                >
                  3
                </IconButton>
                <IconButton variant="text" size="sm">
                  ...
                </IconButton>
                <IconButton variant="text" size="sm">
                  8
                </IconButton>
                <IconButton variant="text" size="sm">
                  9
                </IconButton>
                <IconButton variant="text" size="sm">
                  10
                </IconButton>
              </div>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
