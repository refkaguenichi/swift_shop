import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "./../JS/actions/userActions";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      console.log(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Sign In</h1>
        <>
          {loading && <LoadingBox />}
          {error && <MessageBox variant="danger" loginError={error} />}
        </>

        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>
            <label />
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>Create an account</Link>
          </span>
          <div>
            <label />
            <button className="primary" type="submit">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
