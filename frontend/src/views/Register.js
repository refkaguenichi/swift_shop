import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";
import { signup } from "../JS/actions/userActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userSignUp = useSelector((state) => state.userSignUp);
  const { userInfo, loading, error } = userSignUp;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(signup(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Create an account</h1>
        <>
          {loading && <LoadingBox />}
          {error && <MessageBox variant="danger" registerError={error} />}
        </>

        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            placeholder="Enter username"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span>
            <label />
            Already have an account?{" "}
            <Link to={`/login?redirect=${redirect}`}>Sign In</Link>
          </span>
          <div>
            <label />
            <button className="primary" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
