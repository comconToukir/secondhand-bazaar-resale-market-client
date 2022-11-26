import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext/UserContext";

const options = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const CheckoutForm = ({ booking: { price, _id } }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [cardError, setCardError] = useState(null);

  const { user } = useContext(UserContext);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error(error);
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardNumberElement);

    if (card === null) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment-error", error);
      setProcessing(false);
      setCardError(error.message);
    } else {
      setCardError(null);
    }

    setSuccess(null);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        transactionId: paymentIntent.id,
        transactionTime: new Date(),
        bookingId: _id,
        email: user.email,
        price: price,
      };

      fetch("http://localhost:5000/save-payment-info", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Your payment was processed successfully");
            setTransactionId(paymentIntent.id);
          }
        });
    }

    setProcessing(false);
  };

  return (
    <div className="text-center">
      <form className="form-control w-72" onSubmit={handleSubmit}>
        <label className="label mb-[-5px]">
          <span className="label-text">Card Number</span>
        </label>
        <CardNumberElement
          type="text"
          name="card_num_field"
          className="border h-9 pt-2 px-2"
          options={options}
        />
        <label className="label mb-[-5px]">
          <span className="label-text">Expiry Date</span>
        </label>
        <CardExpiryElement
          type="text"
          name="card_exp_field"
          className="border h-9 pt-2 px-2"
          options={options}
        />
        <label className="label mb-[-5px]">
          <span className="label-text">Card CVC</span>
        </label>
        <CardCvcElement
          type="text"
          name="card_cvc_field"
          className="border h-9 pt-2 px-2"
          options={options}
        />
        <button
          type="submit"
          className={`btn btn-primary mt-5 ${processing ? "loading" : null}`}
          disabled={!stripe || !clientSecret || processing}
        >
          Pay ${price}
        </button>
      </form>
      <div>
        <h6>{cardError}</h6>
        {success ? (
          <div>
            <p>{success}</p>
            <p>Your transaction id: {transactionId}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CheckoutForm;
