import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./../JS/actions/cartActions";
import MessageBox from "./../components/MessageBox";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const cart = useSelector((state) => state.cart);
  const productId = params.id;
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (productId) => {
    if (window.confirm("Are you sure to delete this product from cart?")) {
      dispatch(removeFromCart(productId));
    }
  };
  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  };
  return (
    <div className="rows top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox cart={cartItems} />
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="rows">
                  <div>
                    <img
                      src={`/uploads/${item.image}`}
                      alt={item.name}
                      className="small"
                    />
                  </div>
                  <div className="min-30">
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card card-body">
        <ul>
          <li>
            <h2>
              Subtotal ({cartItems.reduce((total, item) => total + item.qty, 0)}
              items) : $
              {cartItems.reduce(
                (total, item) => total + item.price * item.qty,
                0
              )}
            </h2>
          </li>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              className="primary block"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
