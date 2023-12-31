import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CehckOut from "./CheckOut";
import { userPayment } from "../../../../actions/UserActions";

const stripePromise = loadStripe(
  "pk_test_51NwHkGSEDFbx4uMAoieqN5YqdW5DENZ8p9DG72A431kzPkYUt4mL1jNsafsUCI9gf33fLUfSno8XKitrf5xTe4iP00Dx0rPbwh"
);
const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const request = async () => {
      try {
        const res = await userPayment();
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
            <CehckOut Secret={clientSecret} />
          </Elements>
        )}
      </div>
    </>
  );
};

export default Payment;
