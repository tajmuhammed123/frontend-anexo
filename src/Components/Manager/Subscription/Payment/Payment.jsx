import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js"
import CehckOut from "./CheckOut"
import { subsciptionPayment } from "../../../../actions/ManagerActions"


const stripePromise=loadStripe('pk_test_51NwHkGSEDFbx4uMAoieqN5YqdW5DENZ8p9DG72A431kzPkYUt4mL1jNsafsUCI9gf33fLUfSno8XKitrf5xTe4iP00Dx0rPbwh')
const Payment=()=>{
    const {method}=useParams()
    const [clientSecret,setClientSecret]=useState("");
    const [price,setPirce]=useState(0);
    useEffect(()=>{
        const request=async ()=>{
            try {
                const res=await subsciptionPayment(method)
                console.log(res);
                setClientSecret(res.data.clientSecret)
                setPirce(res.data.price)
            } catch (error) {
                console.log(error.message);
            }
        }
        request()
    },[])
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    return(
        <>
            <div className="app">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CehckOut Secret={clientSecret} method={method} price={price}/>
                    </Elements>
                )}
            </div>
        </>
    )
}

export default Payment