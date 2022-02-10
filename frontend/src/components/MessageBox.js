import React from "react";
import { Link } from "react-router-dom";

const MessageBox = (props) => {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.error}
      {props.loginError}
      {props.registerError}
      {props.userError}
      {props.userUpdateError ? (
        <p>{props.userUpdateError}</p>
      ) : props.userUpdateSuccess ? (
        <p>Updated successfully</p>
      ) : null}
      {props.cart && props.cart.length === 0 && (
        <>
          Cart is empty! <Link to="/">Go Shopping</Link>
        </>
      )}
      {props.orderError}
      {props.orderDeliveredAt ? (
        <p>Delivered at {props.orderDeliveredAt}</p>
      ) : props.notDelivered ? (
        <p>Not Delivered</p>
      ) : props.orderPaidAt ? (
        <p>Paid at {props.orderPaidAt}</p>
      ) : props.notPaid ? (
        <p>Not Paid</p>
      ) : null}
      {props.errorPay}
      {props.ordersError}
    </div>
  );
};

export default MessageBox;
