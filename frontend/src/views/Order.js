import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
// import Stripe from "./../components/Srtipe";
import {
  deliverOrder,
  detailsOrder,
  payOrder,
} from "../JS/actions/orderActions";
import axios from "axios";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../JS/constants/orderConstants";

const Order = () => {
  const [sdkReady, setSdkReady] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    success: successPay,
    error: errorPay,
    loading: loadingPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger" orderError={error} />
      ) : (
        <>
          <h1>Order {order && order._id}</h1>
          <div className="rows top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    {/* <button
                      type="button"
                      className="small"
                      onClick={() => window.print()}
                    >
                      Print
                    </button> */}
                    <p>
                      <strong>Name:</strong> {order.shippingAddress.fullName}{" "}
                      <br />
                      <strong>Address: </strong> {order.shippingAddress.address}
                      ,{order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode},
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <MessageBox
                        variant="success"
                        orderDeliveredAt={order.deliveredAt}
                      />
                    ) : (
                      <MessageBox
                        variant="danger"
                        notDelivered={!order.deliveredAt}
                      />
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong> {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <MessageBox
                        variant="success"
                        orderPaidAt={order.paidAt}
                      />
                    ) : (
                      <MessageBox variant="danger" notPaid={!order.paidAt} />
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item.product}>
                          <div className="rows">
                            <div>
                              <img
                                src={item.image && `/uploads/${item.image}`}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div>
                            <div className="min-30">
                              <Link to={`/products/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="rows">
                      <div>Items</div>
                      <div>${order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="rows">
                      <div>Shipping</div>
                      <div>${order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="rows">
                      <div>Tax</div>
                      <div>${order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="rows">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>${order.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  {!order.isPaid && order.user === userInfo._id && (
                    <li>
                      {!sdkReady ? (
                        <LoadingBox />
                      ) : (
                        <>
                          {errorPay && (
                            <MessageBox variant="danger" errorPay={errorPay} />
                          )}
                          {loadingPay && <LoadingBox />}
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                          {/* <Stripe/> */}
                        </>
                      )}
                    </li>
                  )}
                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <li>
                      {loadingDeliver && <LoadingBox />}
                      {errorDeliver && (
                        <MessageBox
                          variant="danger"
                          errorDeliver={errorDeliver}
                        />
                      )}
                      <button
                        type="button"
                        className="primary block"
                        onClick={deliverHandler}
                      >
                        Deliver Order
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
