import "./onlineFriend.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function OnlineFriend({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={PF + "/person/0.jpeg"}
          alt=""
          className="rightbarProfileImg"
        />
        <span className="rightbarFriendstatus"></span>
      </div>
      <span className="rightbarFriendName">{user.username}</span>
    </li>
  );
}
