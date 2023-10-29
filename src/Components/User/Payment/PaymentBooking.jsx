import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CehckOut from "./CheckOut";
import { axiosUserInstance } from "../../../Constants/axios";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);
const PaymentBooking = () => {
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const request = async () => {
      try {
        // const userData=localStorage.getItem('userInfo')
        // const userInfo=JSON.parse(userData)
        //     const config = {
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${userInfo.token.token}`,
        //       },
        //     };
        const res = await axiosUserInstance.get(`/paymentbookingdata/${id}`);
        console.log(res);
        setPrice(res.data.amount);
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error.message);
      }
    };

    request();
  }, []);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div className="app">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CehckOut Secret={clientSecret} id={id} price={price} />
          </Elements>
        )}
      </div>
    </>
  );
};

export default PaymentBooking;
