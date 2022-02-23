import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrder, listOrderMine } from "../JS/actions/orderActions";
import { ORDER_DELETE_RESET } from "../JS/constants/orderConstants";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrderMine());
  }, [dispatch]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete this order definitely?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <div style={{ "overflow-x": "auto" }}>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger" ordersError={error} />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td className="d-flex">
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      navigate(`/orders/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  {userInfo.isAdmin && (
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
