import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const PaymentPage = () => {
  // const { user } = useContext(UserContext);
  const { id } = useParams();

  // console.log(id);

  const { data: booking = [], isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/payment-booking/${id}`
      );
      return data;
    },
  });

  if (isLoading) return "loading";

  const { productName, image, price, productId, _id } = booking;

  return (
    <div className="grid place-items-center my-12">
      <img src={image} className="h-48 max-w-xl" alt="" />
      <h1 className="text-xl mt-9">
        Payment for <span className="font-medium">{productName}</span>{" "}
      </h1>
      <p className="mb-7">Payment of: <span className="font-medium">${price}</span></p>
      <Elements stripe={stripePromise}>
        <CheckoutForm booking={booking} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
