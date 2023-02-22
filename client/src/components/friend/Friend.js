import "./friend.css";
export default function Friend({ user }) {
    return (
        <li className="sidebarFriendsListItem">
            <img src={user.profilePicture} alt="" className="sidebarFriendsListItemImg" />
            <span className="sidebarFriendsListItemName">{user.username}</span>
        </li>
    )
}
