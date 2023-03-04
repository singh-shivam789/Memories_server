import axios from "axios";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const form = useRef();
  const history = useHistory();
  const [hasRegistered, setHasRegisted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConformPasswordVisible] =
    useState(false);

  const submitHandler = async function (event) {
    event.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      toast.warn("Both passwords must be same!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      toast
        .promise(axios.post(`/auth/register`, user), {
          pending: "Trying to sign you up...",
        })
        .then((res) => {
          if (res.data.exists) {
            toast.warn(`Username/email already in use!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            toast.success("Account successfully created 😊", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setHasRegisted(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      history.push("/login");
    }
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
          <form ref={form} onSubmit={submitHandler} className="loginBox">
            <input
              required
              ref={username}
              type={"text"}
              placeholder="Username "
              className="loginInput"
            />
            <input
              required
              ref={email}
              type={"email"}
              placeholder="Email"
              className="loginInput"
            />
            <input
              required
              ref={password}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="loginInput"
              minLength={"6"}
              maxLength={"15"}
            />
            <input
              required
              ref={confirmPassword}
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="loginInput"
              minLength={"6"}
              maxLength={"15"}
            />
            <button type="submit" className="regPageSignupBtn">
              Sign Up
            </button>
            <Link className="regPageLoginBtn" to="/login">
              Log into Account
            </Link>
            <div
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
              className="passwordVisibilityIcon"
            >
              {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
            <div
              onClick={() => {
                setIsConformPasswordVisible(!isConfirmPasswordVisible);
              }}
              className="confirmPasswordVisibilityIcon"
            >
              {isConfirmPasswordVisible ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
