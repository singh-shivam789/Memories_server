import "./rightbar.css";
import { Users } from "../../dummyData";
import OnlineFriend from "../onlineFriend/OnlineFriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "@material-ui/core/Button";
import { Backdrop, CircularProgress } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Rightbar({ user, onEdit }) {
  let { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [edit, setEdit] = useState(false);
  const [fetchFriends, setFetchFriends] = useState(false);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get("/users/friends/" + user._id);
        setFriends(friendsList.data);
        setFetchFriends(true);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user, currentUser]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "/gift.png"} alt="" className="birthdayImg" />
          <div className="birthdayText">
            <b>Shubham</b> and <b>2 other friends</b> have a birthday today.
          </div>
        </div>
        <img src={PF + "/ad.jpg"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          {Users.map((user) => (
            <OnlineFriend key={user.id} user={user}></OnlineFriend>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const followUnfollowHandler = async () => {
      try {
        if (!followed) {
          await axios.put("/users/" + user._id + "/follow", {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user._id });
        } else {
          await axios.put("/users/" + user._id + "/unfollow", {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        }
        setFollowed(!followed);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        {user.username !== currentUser.username && (
          <Button
            style={{
              textTransform: "capitalize",
              backgroundColor: "#93d7c1",
              color: "whitesmoke",
              padding: "5px 10px",
              marginBottom: "10px",
              marginTop: "30px",
            }}
            variant="contained"
            onClick={followUnfollowHandler}
          >
            {followed ? "Unfollow" : "Follow"}
          </Button>
        )}

        <div className="rightbarTop">
          <h4 className="rightbarTitle">About you</h4>
          <div className="editProfileContainer">
            <h4>Edit Info</h4>
            <EditRoundedIcon onClick={onEdit} className="editIcon" />
          </div>
        </div>

        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city || "-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from || "-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
             {user.relationship}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Your Friends</h4>
        <div className="userFriends">
          {!fetchFriends && <CircularProgress size="15px" />}
          {fetchFriends &&
            friends.length > 0 &&
            friends.map((friend) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${friend.username}`}
                >
                  <div key={friend._id} className="userFriend">
                    <img
                      className="userFriendImg"
                      src={
                        friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "/person/0.jpeg"
                      }
                      alt=""
                    />
                    <span className="userFriendName">{friend.username}</span>
                  </div>
                </Link>
              );
            })}
          {fetchFriends && !friends.length && <p>No friends to show 😕</p>}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? (
          <ProfileRightbar></ProfileRightbar>
        ) : (
          <HomeRightbar></HomeRightbar>
        )}
      </div>
    </div>
  );
}
