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
        <span>{props.userUpdateError}</span>
      ) : props.userUpdateSuccess ? (
        <span>Updated successfully</span>
      ) : null}
      {props.cart && props.cart.length === 0 && (
        <span>
          Cart is empty! <Link to="/">Go Shopping</Link>
        </span>
      )}
      {props.orderError}
      {props.orderDeliveredAt ? (
        <span>Delivered at {props.orderDeliveredAt.substring(0, 10)}</span>
      ) : props.notDelivered ? (
        <span>Not Delivered</span>
      ) : props.orderPaidAt ? (
        <span>Paid at {props.orderPaidAt.substring(0, 10)}</span>
      ) : props.notPaid ? (
        <span>Not Paid</span>
      ) : null}
      {props.errorPay}
      {props.ordersError}
      {props.errorReviewCreate ? (
        <span>{props.errorReviewCreate}</span>
      ) : (
        props.successReviewCreate && <span>Rating created successfully!</span>
      )}
      {props.reviews === 0 && <span>There is no review</span>}
      {props.serachError}
      {props.errorCategories}
      {props.productError}
      {props.pLength === 0 && <span>Product Not Found</span>}
      {props.dashError}
      {props.errorDeleteProduct}
      {props.errorCreateProduct}
      {props.productsError}
      {props.errorUpdate}
      {props.otherErrorUpdate}
      {props.errorUpload}
      {props.errorSellers}
      {props.sl && <span> No Seller Found</span>}
      {props.errorUserEdit}
      {props.otherErrorUserEdit}
      {props.usersError}
      {props.errorDeleteUser ? (
        <span>{props.errorDeleteUser}</span>
      ) : (
        props.successDeleteUser && <span>User deleted Sucessfully</span>
      )}
      {props.errorSeller}
      {props.errorProductsSeller}
      {props.sellerProducts === 0 && <span>There is no product</span>}
      {props.errorOrderDelete}
      {props.otherErrorOrderDelete}
      {props.errorDeliver}
      {props.dailyOrdersMessage === 0 && <span>No sales</span>}
      {props.sumCatMes === 0 && <span>No Category</span>}
      {props.errorTop}
    </div>
  );
};

export default MessageBox;
