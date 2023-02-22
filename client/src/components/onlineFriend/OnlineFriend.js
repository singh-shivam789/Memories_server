import "./onlineFriend.css";
export default function OnlineFriend({ user }) {
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarFriendstatus">
                </span>
            </div>
            <span className="rightbarFriendName">{user.username}</span>
        </li>
    )
}
