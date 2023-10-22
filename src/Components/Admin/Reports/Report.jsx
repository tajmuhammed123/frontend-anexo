import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { axiosAdminInstance } from "../../../Constants/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
   
  export function Report() {
    const [report,setReport]=useState([])
    const navigate=useNavigate()
    const { isLoading, error } = useQuery({
        queryKey: ['reportdata'],
        queryFn: async () => {
          try {
            const adminData=localStorage.getItem('adminInfo')
            const adminInfo=JSON.parse(adminData)
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminInfo.token.token}`,
              },
            };
            const response = await axiosAdminInstance.get(`/reportdata`,config);
            const managerreport = {};
            response.data.data.forEach((item) => {
            if (!managerreport[item.manager._id]) {
                managerreport[item.manager._id] = item.manager.name;
            }
            });
            const uniqueManager = Object.entries(managerreport).map(([_id, name]) => ({ _id, name }));
            setReport(uniqueManager);
            console.log(uniqueManager);
          } catch (err) {
            console.error(err.message);
          }
        },
      });
    return (
        <div className="flex align-middle text-center justify-center flex-col">
        <Typography variant="h3" className="py-5">REPORTS OF MANAGER</Typography>
        <div className="flex justify-center">
      <Card className="w-96">
        <List>
          {report.map((item,index)=>(<ListItem key={index} onClick={()=>navigate(`/admin/reportdetails/${item._id}`)}>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {item.name}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {item._id}
              </Typography>
            </div>
          </ListItem>))}
        </List>
      </Card>
      </div>
      </div>
    );
  }