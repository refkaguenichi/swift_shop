import React from "react";
import { Link } from "react-router-dom";

const MessageBox = (props) => {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.error}
      {props.loginError}
      {props.cart && props.cart.length === 0 && (
        <>
          Cart is empty! <Link to="/">Go Shopping</Link>
        </>
      )}
    </div>
  );
};

export default MessageBox;
