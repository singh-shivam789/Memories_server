import React, { useRef } from "react";
import "./login.css";
export default function Login() {
  let email = useRef(),
    password = useRef();
  const formHandler = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);
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
              required
              minLength="6"
              ref={password}
              placeholder="Password"
              type="password"
              className="loginInput"
            />
            <button type="submit" className="loginButton">
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button type="button" className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
