import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { axiosUserInstance } from "../../../Constants/axios";
import { Card, Chip, Typography } from "@material-tailwind/react";

function History() {
  const [data, setData] = useState([]);
  const [wallet, setWallet] = useState([]);
  const TABLE_HEAD = ["Transaction ID", "Amount", "Status"];

  useEffect(() => {
    const request = async () => {
      try {
        const userData = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(userData);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        };
        const res = await axiosUserInstance.get(
          `/paymenthistory/${userInfo.user._id}`,
          config
        );
        if (res.data) {
          setData(res.data.data);
          setWallet(res.data.user.wallet_amount);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    request();
  }, []);
  return (
    <div className="flex justify-center flex-col items-center">
      <Typography variant="h2" className="py-6">
        PAYMENT HISTORY
      </Typography>
      <Card className="h-full w-1/3">
        <div className="py-5">
          <Typography variant="h2" className="flex flex-col items-center">
            <div>Wallet</div>
            <div>${wallet}</div>
          </Typography>
        </div>
        <div className="overflow-y-scroll">
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
              {data ? data.map((item, index) => (
                <tr key={item._id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item._id}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal flex"
                    >
                      <Chip
                        size="lg"
                        variant="ghost"
                        value={item.amount}
                        color={item.status ? "red" : "green"}
                      />
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.status
                        ? "Paid for Booking"
                        : "Cancelled your Booking"}
                    </Typography>
                  </td>
                </tr>
              )): <h2>No Payments done</h2>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default History;
