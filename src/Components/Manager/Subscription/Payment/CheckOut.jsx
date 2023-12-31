import { Typography } from "@material-tailwind/react";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { subscriptionSuccess } from "../../../../actions/ManagerActions";

function CehckOut({ method, price }) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://frontend-anexo.vercel.app/success",
      },
      redirect: "if_required",
    });
    if (paymentIntent) {
      subscriptionSuccess(method);
      navigate("/manager/subscriptionsuccess");
    }

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured");
    }

    setIsLoading(false);
  };


  const paymentElementOptions = {
    layouts: "tabs",
  };
  return (
    <>
      <div className="bg-white min-h-screen flex flex-col justify-between">
        <header className="py-4 bg-transparent text-gray-800 text-center">
          <h1 className="text-4xl font-extrabold">Secure Payment</h1>
          <p className="mt-2">Fast, Easy, and Secure</p>
        </header>
        <main className="flex-grow flex items-center justify-center px-4">
          <form
            id="payment-form"
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
          >
            <div className="flex justify-center">
              <div className="flex justify-between w-96">
                <Typography variant="h3" className="uppercase">
                  {method}
                </Typography>
                <Typography variant="h3">₹ {price}</Typography>
              </div>
            </div>
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => setEmail(e.target.value)}
              class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
              class="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              disabled={isloading || !stripe || !elements}
              id="submit"
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 rounded-md shadow-md hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring focus:ring-teal-300"
            >
              <span id="button-text">
                {isloading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {message && (
              <div id="payment-message" className="mt-4 text-red-500">
                {message}
              </div>
            )}
          </form>
        </main>

        <footer className="py-4 bg-transparent text-gray-800 text-center">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default CehckOut;
