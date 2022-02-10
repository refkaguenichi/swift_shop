import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "./../JS/actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { cartItems } = cart;
  const { userInfo } = userSignIn;
  const signoutHandler = () => {
    dispatch(signout(navigate));
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={`/cart`}>
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
        </li>

        <li>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name}
                <i className="fa fa-caret-down"></i>
              </Link>
              <ul>
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order history</Link>
                </li>
                <li>
                  <Link to="#" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin
                <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li>
          <Link to="/">SwiftShop</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
