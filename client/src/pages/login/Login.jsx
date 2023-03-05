import React, { useContext, useRef } from "react";
import "./login.css";
import { login } from "../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const { isFetching, dispatch } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let email = useRef(),
    password = useRef();
  const formHandler = (e) => {
    e.preventDefault();
    login(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Memories</h3>
          <div className="loginDesc">
            Connect with friends, create and share memories.
          </div>
        </div>
        <div className="loginRight">
          <form onSubmit={formHandler} className="loginBox">
            <input
              required
              ref={email}
              placeholder="Email"
              minLength="6"
              type="email"
              className="loginInput"
            />
            <input
              onChange={() => {
                setIsPasswordVisible(false);
              }}
              required
              minLength="6"
              ref={password}
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              className="loginInput"
            />
            <button
              disabled={isFetching}
              type="submit"
              className="loginPageLoginBtn"
            >
              {isFetching ? <CircularProgress color={"inherit"} /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link
              disabled={isFetching}
              className="loginPageRegBtn"
              to="/register"
            >
              {isFetching ? (
                <CircularProgress color="white" />
              ) : (
                "Create a new Account"
              )}
            </Link>
            <div
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              className="loginPasswordVisibilityIcon"
            >
              {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
