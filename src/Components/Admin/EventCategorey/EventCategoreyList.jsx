import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import { axiosAdminInstance } from "../../../Constants/axios";
import { useState } from "react";
import { useEffect } from "react";
 
 
export function EventCategoreyList() {

    const [events,setEvents]=useState([])
    useEffect(()=>{
      axiosAdminInstance.get('/geteventlist').then((res)=>setEvents(res.data.eventData))
    },[])

    const TABLE_HEAD = ["Name", "Description", "Employed", ""];
 
const TABLE_ROWS = events.map((item)=>({
    name: item.event_name,
    job: item.description,
    img: item.event_image,
    is_block:item.is_block
  }))
  return (
    <div className="flex justify-center w-full">
    <div className="w-1/2 pt-9">
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
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
          {TABLE_ROWS.map(({ name, job, img, is_block }, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Avatar src={img} alt={name} size="sm" className="p-2" />
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {job}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  {is_block?<Button color="green">UnBlock</Button>:<Button color="red">Block</Button>}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    </div>
    </div>
  );
}