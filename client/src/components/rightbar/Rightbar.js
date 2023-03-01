import "./rightbar.css";
import { Users } from "../../dummyData";
import OnlineFriend from "../onlineFriend/OnlineFriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "@material-ui/core/Button";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  let { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get("/users/friends/" + user._id);
        setFriends(friendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

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
        
      } catch (error) {
        console.log(error);
      }
    }
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
            Follow
          </Button>
        )}
        <h4 className="rightbarTitle">About you</h4>
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
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Your Friends</h4>
        <div className="userFriends">
          {friends.length ? (
            friends.map((friend) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${friend.username}`}
                >
                  <div className="userFriend">
                    <img
                      className="userFriendImg"
                      src={
                        friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "/person/1.jpeg"
                      }
                      alt=""
                    />
                    <span className="userFriendName">{friend.username}</span>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No friends to show 😕</p>
          )}
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
