import { useHistory } from "react-router-dom";
import "./friend.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Friend({ user }) {
const history = useHistory();
  return (
    <li className="sidebarFriendsListItem">
      <img
        onClick={() => {
          history.push("/profile/" + user.username)
        }}
        src={
          user.profilePicture ? PF + user.profilePicture : PF + "/person/0.jpeg"
        }
        alt=""
        className="sidebarFriendsListItemImg"
      />
      <span className="sidebarFriendsListItemName">{user.username}</span>
    </li>
  );
}
