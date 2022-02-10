import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { detailsOrder, payOrder } from "../JS/actions/orderActions";
import axios from "axios";
import { ORDER_PAY_RESET } from "../JS/constants/orderConstants";

const Order = () => {
  const [sdkReady, setSdkReady] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const orderId = params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    success: successPay,
    error: errorPay,
    loading: loadingPay,
  } = orderPay;
  useEffect(() => {
    const addPaypalScript = async () => {
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
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else if (!(order && order.isPaid)) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay, sdkReady]);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
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
          <div className="row top">
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
                          <div className="row">
                            <div>
                              <img
                                src={`/uploads/${item.image}`}
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
                    <div className="row">
                      <div>Items</div>
                      <div>${order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>${order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>${order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>${order.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  {!order.isPaid && (
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
                        </>
                      )}
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
