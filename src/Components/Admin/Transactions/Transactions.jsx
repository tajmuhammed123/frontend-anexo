import { useQuery } from "@tanstack/react-query";
import { axiosAdminInstance } from "../../../Constants/axios";
import { Card, Chip, Spinner, Typography } from "@material-tailwind/react";
import { useState } from "react";

function UserData() {
  const [bookData,setBookData]=useState([])
  const { isLoading, error } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      try {
        const userData=localStorage.getItem('adminInfo')
  const userInfo=JSON.parse(userData)
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token.token}`,
    },
  };
        const response = await axiosAdminInstance.get('/getbookingdata',config).then((res)=>{setBookData(res.data.data),console.log(res.data.data)}).catch((err)=>console.log(err.message))
        setBookData(response.data.data);
        console.log(bookData);
      } catch (err) {
        console.error(err.message);
      }
    },
  });

  if(isLoading){
    return <div className='h-screen w-screen flex items-center justify-center'>
      <Spinner /></div>;
}
const TABLE_HEAD = ["Name", "Salutation", "Location", "Status", "Account", ""];
  return (
    <div className='flex justify-center flex-col'>
    <div className='flex justify-center'>
    <Typography variant='h2'>TRANSACTIONS</Typography>
    </div>
    <div className='flex justify-center'>
    
  {bookData.length>0 ?<Card className="h-full w-1/2 overflow-y-scroll">
  <table className="w-full min-w-max table-auto text-left">
    <thead>
      <tr>
        {TABLE_HEAD.map((head) => (
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
      {bookData.map((item, index) => {
        const isLast = index === bookData.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

        return (
          <tr key={item._id}>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {item.userId}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {item.managerId}
              </Typography>
            </td>
            <td className={classes}>
                    <Chip
                    className='w-max'
                      size="sm"
                      variant="ghost"
                      value={item.amount}
                      color={
                        item.status === "paid"
                          ? "green"
                          : item.amount === "not paid"
                          ? "amber"
                          : "red"
                      }
                    />
            </td>
            <td className={classes}>
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                {item.status === "paid"
                          ? "Paid"
                          : item.amount === "not paid"
                          ? "Not Paid"
                          : "Cancelled"}
              </Typography>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</Card>:<p>No Transactions</p>}
</div>
  </div>
  )
}

export default UserData