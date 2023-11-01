import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosAdminInstance } from "../../../Constants/axios";
import { useState } from "react";
import Spinner from "../../../Spinner";

export function Detail() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const getReportData = async () => {
    try {
      setIsLoading(true);
      const adminData = localStorage.getItem("adminInfo");
      const adminInfo = JSON.parse(adminData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token.token}`,
        },
      };
      const response = await axiosAdminInstance.get(
        `/reportdetails/${id}`,
        config
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleReject = async () => {
    const adminData = localStorage.getItem("adminInfo");
    const adminInfo = JSON.parse(adminData);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token.token}`,
      },
    };
    let response = await axiosAdminInstance.post(
      "/managerreject",
      { id },
      config
    );
    if (response.data.success) {
      alert("User Blocked");
    }
  };
  useEffect(() => {
    getReportData();
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex align-middle text-center justify-center flex-col">
      <Typography variant="h3" className="py-5">
        REPORTS OF MANAGER
      </Typography>
      <div>
        <Button onClick={handleReject}>Block</Button>
      </div>
      <div className="flex justify-center">
        {data.map((item, index) => (
          <>
            <Card className="mt-6 w-96 m-5">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Unknown User
                </Typography>
                <Typography>{item.content}</Typography>
              </CardBody>
            </Card>
          </>
        ))}
      </div>
    </div>
  );
}
