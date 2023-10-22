import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAdminInstance } from "../../../Constants/axios";
import { Button, Card, Spinner, Typography } from "@material-tailwind/react";
import { useState } from "react";

function UserData() {
  const [userData,setUserData]=useState([])

  const queryClient=useQueryClient()
  const { isLoading:isLoading1, error:error1 } = useQuery({
    queryKey: ['userdata'],
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
        const response = await axiosAdminInstance.get('/getuserdata',config).then((res)=>{setUserData(res.data.data),console.log(res.data.data)}).catch((err)=>console.log(err.message))
        console.log(response.data.data);
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });
  const handleBlock=async(id)=>{
    try {
      const userData=localStorage.getItem('adminInfo')
    const userInfo=JSON.parse(userData)
    console.log(userInfo);
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
      await axiosAdminInstance.get(`/blockuser/${id}`,config).then(()=>queryClient.invalidateQueries('userdata'))
    } catch (error) {
      console.log(error.message);
    }
  }

  const USER_HEAD = [ "ID" ,"Name", "Mobile", "Email", "Block/UnBlock" ];
 
  const USER_ROWS = userData.map((data) => {
    return {
      id: data._id,
      name: data.name,
      mob: data.mob,
      email: data.email,
      is_block: data.is_block,
    };
  });

  if(isLoading1){
    return <div className='h-screen w-screen flex items-center justify-center'>
      <Spinner /></div>;
}
  return (
    <div className='mt-8'>
    <div className='flex justify-center'>
    <Typography variant='h4'>User Data</Typography>
    </div>
    <div className='m-5 flex justify-center'>
        <Card className="h-full w-2/3 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {USER_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {name}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {mob}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {email}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    {is_block?<Button onClick={(e)=>handleBlock(e.target.value)} color='red' value={id}>UnBlock</Button>:
                    <Button onClick={(e)=>handleBlock(e.target.value)} value={id} color='green'>Block</Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  </div>
  )
}

export default UserData