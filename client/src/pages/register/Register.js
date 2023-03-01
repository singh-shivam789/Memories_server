import axios from "axios";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
// import { ToastContainer, toast } from "react-toastify";
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
    // TODO
    // CHECK IF USERNAME ALREADY EXISTS,
    // IF YES -> REDIRECT TO LOGIN
    // IF NOT SUGGEST TO CHANGE USERNAME
    // toast
    //   .promise(axios.get(`/users?username=${user.username}`), {
    //     pending: "Trying to sign you up...",
    //     success: "Got it!",
    //     error: "Something is not right ☹️",
    //   })
    //   .then((res) => {
    //     if (res.data.user) {
    //       toast.warn(`Username already taken!`, {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //       });
    //     } else {
    //       toast.success("This username is available 😊", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    let res = await axios.post(`/auth/register`, user);
    console.log(res);
    if (res.response.data === "User with this email already exists!")
      history.push("/login");
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
        </div>
      </div>
    </div>
  );
}
