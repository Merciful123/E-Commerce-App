import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => {
      return res.json();
    });

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          Name: currentUser ? currentUser.DisplayName : "Guest",
        },
      },
    });
    setIsProcessingPayment(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h3>Credit Card Payment</h3>
        <CardElement />
        <PaymentButton
          buttonType={BUTTON_TYPE_CLASSES.base}
          isLoading={isProcessingPayment}
        >
          PAY NOW
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
