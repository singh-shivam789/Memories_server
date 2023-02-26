import axios from "axios";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
import { Alert } from "@mui/material";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const form = useRef();
  const history = useHistory();
  const [isValid, setIsValid] = useState(false);
  const [isValidStyle, setIsValidStyle] = useState({});
  const submitHandler = async function (event) {
    event.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords do not match!");
      setIsValid(false);
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };

        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
    form.current.reset();
  };
  return (
    <div className="login">
      <Alert />
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Memories</h3>
          <div className="loginDesc">
            Connect with friends, create and share memories.
          </div>
        </div>
        <div className="loginRight">
          <form ref={form} onSubmit={submitHandler} className="loginBox">
            <input
              ref={username}
              type={"text"}
              placeholder="Username "
              className="loginInput"
            />
            <input
              ref={email}
              type={"email"}
              placeholder="Email"
              className="loginInput"
            />
            <input
              ref={password}
              type={"password"}
              placeholder="Password"
              className="loginInput"
              minLength={"6"}
            />
            <input
              ref={confirmPassword}
              type={"password"}
              placeholder="Confirm Password"
              className="loginInput"
              minLength={"6"}
            />
            <button type="submit" className="regPageSignupBtn">
              Sign Up
            </button>
            <Link className="regPageLoginBtn" to="/login">
              Log into Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
