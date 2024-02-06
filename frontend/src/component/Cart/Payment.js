import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../action/orderAction";
import KhaltiCheckout from "khalti-checkout-web";
import myKey from "../Khalti/khaltiKey";
import axios from "axios";
import { Typography } from "@mui/material";
import paymentImage from "./khalti.png";
import { CLEAR_CART } from "../../constants/cartConstants";
const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  
  const paymentInfoId = Date.now().toString();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  let config = {
    // replace this key with yours
    publicKey: myKey.publicTestKey,
    productIdentity: user._id,
    productName: user.name,
    
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        let data = {
          token: payload.token,
          amount: payload.amount,
        };

        axios.post("http://localhost:4000/api", data).then((response) => {
          console.log(response.data);
          
        });
        // Update the payment info with the ID and status
        order.paymentInfo = {
          id: paymentInfoId,
          status: "PAID",
        };
        // Clear cart
     dispatch({
      type: CLEAR_CART,
    });
        localStorage.removeItem('cartItems');
        //localStorage.removeItem('shippingAddress');
       // localStorage.removeItem('paymentMethod');
        toast.success("Successful Transaction", {
         position: "top-right",
          theme: "dark",
        });
        dispatch(createOrder(order));

        navigate("/success");
      },
      // onError handler is optional
      onError(error) {
        // handle errors

        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  let checkout = new KhaltiCheckout(config);
  const handleCreateOrder = () => {
    // Update the payment info with the ID and status
    order.paymentInfo = {
      id: paymentInfoId,
      status: "NOT PAID",
    };
    // Clear cart
    dispatch({
      type: CLEAR_CART,
    });
    localStorage.removeItem("cartItems");
    //localStorage.removeItem('shippingAddress');
    // localStorage.removeItem('paymentMethod');
    toast.success("Order created successfully", {
      position: "top-right",
      theme: "dark",
    });
    dispatch(createOrder(order));
    navigate("/success");
  };
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        
      <h2 className="paymentHeading">Selet Payment Method</h2>
       <img src={paymentImage} alt="Payment method" />
        <button
          className="paymentFormBtn"
          onClick={() => 
           
            checkout.show({ amount: Math.round(orderInfo.totalPrice * 100 ) })}
          //style={buttonStyles}
        >
          Pay 
        </button>
        <button className="paymentFormBtn" onClick={handleCreateOrder}>
          Cash on delivery
        </button>
      </div>
    </Fragment>
  );
};

export default Payment;


