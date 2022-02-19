import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "./../JS/actions/userActions";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { useState } from "react";

const Appbar = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { cartItems } = cart;
  const { userInfo } = userSignIn;
  const signoutHandler = () => {
    dispatch(signout(navigate));
  };
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <h1>
              <Link to="/" className="app-title">
                Swift Shop
              </Link>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav style={{ maxHeight: "100px" }} navbarScroll>
              <Link to="/" className="fa fa-home fa-lg"></Link>
              <Link to="/cart" className="fa fa-shopping-cart fa-lg">
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {!show && (
                <Link
                  to="#"
                  className="fa fa-search fa-lg"
                  onClick={handleShow}
                ></Link>
              )}
              {show && <SearchBox show={show} setShow={setShow} />}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                  <NavDropdown.Item
                    onClick={() => {
                      window.location.href = `/profile`;
                    }}
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/orderhistory">
                    My Orderhistory
                  </NavDropdown.Item>
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/dashboard">
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/productlist">
                        All Products
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/orderlist">
                        All Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/userlist">
                        All Users
                      </NavDropdown.Item>
                    </>
                  )}

                  {userInfo && userInfo.isSeller && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/productlist/seller">
                        Seller Products
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/orderlist/seller">
                        Seller Orders
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link to="/login" className="btn-outline link">
                    {" "}
                    Login
                  </Link>
                  <Link to="/register" className="btn-contained link">
                    {" "}
                    Register
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Appbar;
