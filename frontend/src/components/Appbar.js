import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "./../JS/actions/userActions";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";

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
    setShow(true);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <h1>
              <Link to="/">Swift Shop</Link>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              // className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/">
                  <i className="fa fa-home"></i>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/cart">
                  <i className="fa fa-shopping-cart"></i>
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                  <NavDropdown.Item>
                    <Link to="/profile">User Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/orderhistory">Order history</Link>
                  </NavDropdown.Item>

                  {userInfo && userInfo.isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <Link to="/productslist">Products</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/orderslist">Orders</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to="/userslist">Users</Link>
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
                  <Button variant="outline-success">
                    <Link to="/login"> Sign-in</Link>
                  </Button>
                  <Button variant="outline-success">
                    <Link to="/register"> Sign-up</Link>
                  </Button>
                </>
              )}
            </Nav>
            <i className="fa fa-search" onClick={handleShow}></i>
            {show && (
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Appbar;
