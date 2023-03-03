import React, { useRef } from "react";

export default function EditProfileForm() {
  let username = useRef();
  let desc = useRef();
  let city = useRef();
  let from = useRef();
  let relationship = useRef();

  return (
    <form className="editProfileForm">
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
