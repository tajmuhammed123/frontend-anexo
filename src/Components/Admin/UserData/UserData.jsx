import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAdminInstance } from "../../../Constants/axios";
import { useState } from "react";
import Spinner from "../../../Spinner";
import { GenerateSuccess } from "../../../Validation/EventUpdation";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";

export default function UserData() {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();
  const { isLoading: isLoading1, } = useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      try {
        const userData = localStorage.getItem("adminInfo");
        const userInfo = JSON.parse(userData);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        };
        await axiosAdminInstance
          .get("/getuserdata/1", config)
          .then((res) => {
            setUserData(res.data.data)
          })
          .catch((err) => console.log(err.message));
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });

  const handleUserSearch = async () => {
    try {
      await axiosAdminInstance
        .get(`/searchusers/${search}`)
        .then((res) => setUserData(res.data.user));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleBlock = async (id) => {
    try {
      const userData = localStorage.getItem("adminInfo");
      const userInfo = JSON.parse(userData);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };

      // Make the GET request with the configured headers
      // await axiosAdminInstance.get(`/blockuser/${id}`, config)
      //   .then(() => queryClient.invalidateQueries('user'))
      //   .catch((error) => {
      //     // Handle any errors here
      //     console.error(error);
      //   })
      await axiosAdminInstance.get(`/blockuser/${id}`, config).then(() => {
        queryClient.invalidateQueries("userdata"),
          GenerateSuccess("User Updated");
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const USER_HEAD = ["ID", "Name", "Mobile", "Email", "Block/UnBlock"];

  const USER_ROWS = userData.map((data) => {
    return {
      id: data._id,
      name: data.name,
      mob: data.mob,
      email: data.email,
      is_block: data.is_block,
    };
  });

  if (isLoading1) {
    return <Spinner />;
  }

  const handlePagination = async (num) => {
    try {
      const userData = localStorage.getItem("adminInfo");
      const userInfo = JSON.parse(userData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      await axiosAdminInstance
        .get(`/getuserdata/${num}`, config)
        .then((res) => {
          setUserData(res.data.data), console.log(res.data.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full flex align-middle justify-center">
      <Card className="h-full w-2/3 ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                User List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are list of users
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
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
                <Button
                  size="sm"
                  className="!absolute right-1 top-1 rounded"
                  onClick={handleUserSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {USER_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
              {USER_ROWS.map(({ id, name, mob, email, is_block }, index) => {
                const isLast = index === USER_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {mob}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      {is_block ? (
                        <Button
                          onClick={(e) => handleBlock(e.target.value)}
                          color="red"
                          value={id}
                        >
                          UnBlock
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => handleBlock(e.target.value)}
                          value={id}
                          color="green"
                        >
                          Block
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <div className="flex items-center gap-2">
            <IconButton
              variant="outlined"
              name="1"
              size="sm"
              onClick={(e) => handlePagination(e.target.name)}
            >
              1
            </IconButton>
            <IconButton
              variant="text"
              name="2"
              size="sm"
              onClick={(e) => handlePagination(e.target.name)}
            >
              2
            </IconButton>
            <IconButton
              variant="text"
              name="3"
              size="sm"
              onClick={(e) => handlePagination(e.target.name)}
            >
              3
            </IconButton>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
