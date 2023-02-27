import axios from "axios";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const form = useRef();
  const history = useHistory();
  // const [isValid, setIsValid] = useState(false);
  // const [isValidStyle, setIsValidStyle] = useState({});
  const submitHandler = async function (event) {
    event.preventDefault();
   const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };

        let res = await toast.promise(axios.get(`/users?username=${user.username}`), {
          pending: "trying to get your info...",
          success: "Got it!",
          error: "Something is not right ☹️",
        });
        console.log(res);
        // history.push("/login");
      }

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
              type={"text"}
              placeholder="Password"
              className="loginInput"
              minLength={"6"}
            />
            <input
              ref={confirmPassword}
              type={"text"}
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
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
