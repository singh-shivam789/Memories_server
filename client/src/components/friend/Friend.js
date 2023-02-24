import "./friend.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

export default function Friend({ user }) {
  return (
    <li className="sidebarFriendsListItem">
      <img
        src={PF + "/person/0.jpeg"}
        alt=""
        className="sidebarFriendsListItemImg"
      />
      <span className="sidebarFriendsListItemName">{user.username}</span>
    </li>
  );
}
