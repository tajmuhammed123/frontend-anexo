import { Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Spinner from "../../../Spinner";
import { axiosManagerInstance } from "../../../Constants/axios";
import { useQuery } from "@tanstack/react-query";
import ReportData from "./ReportData";

function DashBoard() {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [booking,setBooking]=useState({})
  const [paymentData,setPaymentData]=useState([])

  // Define your static chart data here
  const managerData = localStorage.getItem("managerInfo");
  const managerInfo = JSON.parse(managerData);

  const { isLoading, error } = useQuery({
    queryKey: ["dashboarddata"],
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
            `/getdashboarddata/${managerInfo.user._id}`,
          config
        );
        setPaymentData(response.data.payment)
        setBooking(response.data.bookings)
        const staticChartData = [
          {
            name: "Weekly Data",
            data: paymentData.map((item)=>(
              item.count
            )),
          },
        ];
        setChartData(staticChartData);
        setChartOptions({
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: paymentData.map(item => `${new Date(item.startDate).getUTCDate()}/${new Date(item.startDate).getUTCMonth() + 1}`),
          },
        });
        console.log(booking.paid);
        console.log(paymentData);
        console.log(response);
        console.log(response.data.data);
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });


  const series = [booking.paid, booking.notPaid, booking.pending, booking.cancel];
  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Paid", "Not Paid", "Pending", "Cancelled"],
  };

  if(isLoading ){
    return <Spinner />
}

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <Typography variant="h2" className="py-5">
          Report
        </Typography>
        <div>
          <ReportData chartData={chartData} booking={booking} managerInfo={managerInfo}/>
        </div>
        <div className="flex justify-around w-2/3">
          <Card className="mt-6 w-96 mb-9">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Weekly Data
              </Typography>
              <Chart
                options={chartOptions}
                series={chartData}
                type="bar"
                width="100%"
                height="100%"
              />
            </CardBody>
          </Card>
          <Card className="mt-6 w-96 mb-9">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Booking Statuses
              </Typography>
              <Chart
                options={options}
                type="pie"
                width="100%"
                height="100%"
                series={series}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
