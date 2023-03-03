import axios from "axios";
import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./editProfile.css";
export default function EditProfile() {
  let history = useHistory();
  let { user: currentUser, dispatch } = useContext(AuthContext);
  let username = useRef();
  let desc = useRef();
  let city = useRef();
  let from = useRef();
  let relationship = useRef();

  const handler = async (e) => {
    e.preventDefault();
    let updatedUser = await axios.put("/users/" + currentUser._id, {
      userId: currentUser._id,
      username:
        username.current.value.trim() === ""
          ? currentUser.username
          : username.current.value,
      desc:
        desc.current.value.trim() === ""
          ? currentUser.desc
          : desc.current.value,
      city:
        city.current.value.trim() === ""
          ? currentUser.city
          : city.current.value,
      from:
        from.current.value.trim() === ""
          ? currentUser.from
          : from.current.value,
      relationship:
        relationship.current.value.trim() === ""
          ? currentUser.relationship
          : relationship.current.value,
    });

    dispatch({ type: "EDIT_PROFILE_INFO", payload: updatedUser.data });
    history.push("/profile/" + username);
  };

  return (
    <form onSubmit={handler} className="editProfileForm">
      <label htmlFor="username">Username: </label>
      <input type="text" id="username" ref={username} /> <br />
      <label htmlFor="about">About:</label>
      <input type="text" id="about" ref={desc} /> <br />
      <label htmlFor="city">City:</label>
      <input type="text" id="city" ref={city} /> <br />
      <label htmlFor="from">From:</label>
      <input type="text" id="from" ref={from} /> <br />
      <label htmlFor="relationship">Relationship:</label>
      <input type="text" id="relationship" ref={relationship} /> <br />
      <button type="submit">Submit</button>
    </form>
  );
}
