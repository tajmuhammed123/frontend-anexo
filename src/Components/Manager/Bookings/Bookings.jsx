
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Input,
  TabsHeader,
  Tabs,
  Tab,
} from "@material-tailwind/react";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Spinner";

function Bookings() {
  const { manager } = useSelector((state) => state.managerInfo);
  const [datalist, setData] = useState([]);
  const [payment, setPayment] = useState("paid");
  const [searchInput, setSearchInput] = useState("");

  const paidstatus = datalist.filter((item) => {
    const nameMatch = item.is_paid == payment;
    return nameMatch;
  });

  const data = paidstatus.filter((item) => {
    const searchInputLower = searchInput.toLowerCase();
    const nameMatch = item.event_name.toLowerCase().includes(searchInputLower);
    return nameMatch;
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, [data]);
  const { isLoading } = useQuery({
    queryKey: ["bookingdata"],
    queryFn: async () => {
      try {
        const managerData = localStorage.getItem("managerInfo");
        const managerInfo = JSON.parse(managerData);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${managerInfo.token.token}`,
          },
        };
        const response = await axiosManagerInstance.get(
          `/bookingdata/${manager.user._id}`,
          config
        );
        setData(response.data.data);
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });
  const TABS = [
    {
      label: "Not Paid",
      value: "not paid",
    },
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Pending",
      value: "pending",
    },
  ];
  const TABLE_HEAD = ["Transaction", "Date", "Status", ""];

  const TABLE_ROWS =
    data.length > 0
      ? data.map((item) => ({
          img: item.user_id.profile_img,
          name: item.event_name,
          amount: "$2,500",
          date:
            item.date &&
            item.date.map((item, index) => (
              <div key={index}>{new Date(item).toDateString()}</div>
            )),
          is_paid: item.is_paid,
          id: item._id,
        }))
      : [];

      if(isLoading ){
        return <Spinner />
    }
  return (
    <div className="w-full flex justify-center flex-col">
      <Typography variant="h2" className="flex justify-center w-full">
        Bookings
      </Typography>
      <div className="w-full flex justify-center py-5">
        <Card className="h-full w-1/2">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Booking list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all bookings
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
                {/* <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button> */}
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full ">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => {
                        setPayment(value);
                      }}
                    >
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  onChange={(e) => setSearchInput(e.target.value)}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          {data.length > 0 ? (
            <>
              <CardBody className="overflow-y-scroll px-0">
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
                    {TABLE_ROWS.map(
                      ({ img, name, date, is_paid, id }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={id}>
                            <td className={classes}>
                              <div
                                className="flex items-center gap-3"
                                onClick={() =>
                                  navigate(`/manager/bookinguser/${id}`)
                                }
                              >
                                <Avatar
                                  src={img}
                                  alt={name}
                                  size="md"
                                  className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                />
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {name}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {date}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Chip
                                  size="lg"
                                  variant="ghost"
                                  value={is_paid}
                                  color={
                                    is_paid == "paid"
                                      ? "green"
                                      : is_paid === "pending"
                                      ? "amber"
                                      : "red"
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" size="sm">
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  <IconButton variant="outlined" size="sm">
                    1
                  </IconButton>
                  <IconButton variant="text" size="sm">
                    2
                  </IconButton>
                  <IconButton variant="text" size="sm">
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
            </>
          ) : (
            <Typography className="flex justify-center py-5">
              No bookings found
            </Typography>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Bookings;
