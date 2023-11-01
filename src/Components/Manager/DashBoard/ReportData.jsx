import React from 'react';
import './style.css';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
} from "@material-tailwind/react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import { axiosManagerInstance } from '../../../Constants/axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
 
export default function ReportData({chartData,booking, managerInfo}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
 
  const handleOpen = () => setOpen(!open);

  const { isLoading, error } = useQuery({
    queryKey: ["reportdata"],
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
          `/bookingdata/${managerInfo.user._id}`,
          config
        );
        setData(response.data.data);
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });

  const downloadPDF = () =>{
    const capture = document.querySelector('.actual-receipt');
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      doc.save('invoice.pdf');
    })
  }

  const totalAdvanceAmount = data
  .filter(item => item.is_paid === 'paid')
  .reduce((total, item) => total + item.advance_amount, 0);

 
const TABLE_HEAD = ["EVENT NAME", "DATE", "ADDRESS","ADVANCE"];
 
 
  return (
    <div className='bodydata'>
      <Button onClick={handleOpen}>Report Data</Button>

    <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Report Data</DialogHeader>
        <div className='actual-receipt'>
        <DialogBody>
        <div className="invoice w-full px-6 ">
            <header className="clearfix invoiceheader">
                <div id="logo">
                <img src='/Logo/AX BLACK.png'  alt="Company Logo" />
                </div>
                <div id="company">
                <h2 className="name">ANEXO</h2>
                <div>Kakkanchery, Kozhikode</div>
                <div>(+91) 9895299091</div>
                <div>
                    <a href="mailto:anexo4969@example.com">anexo4969@example.com</a>
                </div>
                </div>
            </header>
            <main>
                <div id="details" className="clearfix">
                <div id="client">
                    <div className="to">INVOICE TO:</div>
                    <h2 className="name">{managerInfo.user.name}</h2>
                    <div className="address">{managerInfo.user.mob}</div>
                    <div>
                    <a href={`mailto:${managerInfo.user.email}`}>{managerInfo.user.email}</a>
                    </div>
                </div>
                <div id="invoice">
                    <div className="date">Date of Invoice: {moment().format("YYYY-MM-DD")}</div>
                </div>
                </div>
     <Card className="h-full w-full">
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
         {data
                    .filter(item => item.is_paid === 'paid')
                    .map((item, index) =>  {
             const isLast = index === data.length - 1;
             const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
             return (
               <tr key={index}>
                 <td className={classes}>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="font-normal"
                   >
                     {item.event_name}
                   </Typography>
                 </td>
                 <td className={classes}>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="font-normal"
                   >
                     {item.date.map((isoDateString, index) => {
                              const date = new Date(isoDateString);
                              return (
                                <div key={index}>
                                  {date.toLocaleDateString()}
                                  <br />
                                </div>
                              );
                            })}
                   </Typography>
                 </td>
                 <td className={classes}>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="font-normal w-40"
                   >{item.address}
                   </Typography>
                 </td>
                 <td className={classes}>
                   <Typography
                     as="a"
                     href="#"
                     variant="small"
                     color="blue-gray"
                     className="font-medium"
                   >
                     {item.advance_amount}
                   </Typography>
                 </td>
               </tr>
             );
           })}
         </tbody>
                    <tr>
                    <td colSpan="2"></td>
                    <td colSpan="1">TOTAL</td>
                    <td>₹ {totalAdvanceAmount}</td>
                    </tr>
       </table>
     </Card>
                <div id="notices">
                <div className="notice">
                    Thank You for choosing us.
                </div>
                </div>
            </main>
     </div>
        </DialogBody>
        </div>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="green" onClick={downloadPDF}>
            Download
          </Button>
        </DialogFooter>
      </Dialog>
        {/* </DialogBody>
        
      </Dialog> */}
    </div>
  );
}
