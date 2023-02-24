import "./rightbar.css";
import { Users } from "../../dummyData";
import OnlineFriend from "../onlineFriend/OnlineFriend";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Rightbar({ profile }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? (
          <ProfileRightbar></ProfileRightbar>
        ) : (
          <HomeRightbar></HomeRightbar>
        )}
      </div>
    </div>
  );
}

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
  return (
    <>
      <h4 className="rightbarTitle">About you</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">Faridabad</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">Delhi</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">Your Friends</h4>
      <div className="userFriends">
        <div className="userFriend">
          <img className="userFriendImg" src={PF + "/person/1.jpeg"} alt="" />
          <span className="userFriendName">Shubham</span>
        </div>
        <div className="userFriend">
          <img className="userFriendImg" src={PF + "/person/3.jpeg"} alt="" />
          <span className="userFriendName">Panda</span>
        </div>
        <div className="userFriend">
          <img className="userFriendImg" src={PF + "/person/2.jpeg"} alt="" />
          <span className="userFriendName">Rishabh</span>
        </div>
        <div className="userFriend">
          <img className="userFriendImg" src={PF + "/person/4.jpeg"} alt="" />
          <span className="userFriendName">Saksam</span>
        </div>
        <div className="userFriend">
          <img className="userFriendImg" src={PF + "/person/5.jpeg"} alt="" />
          <span className="userFriendName">Aman Davies</span>
        </div>
        <div className="userFriend">
          <img className="userFriendImg" src={PF + "/person/6.jpeg"} alt="" />
          <span className="userFriendName">Himanshu</span>
        </div>
        <div className="userFriend">
          <img className="userFriendImg" src={PF + "/person/7.jpeg"} alt="" />
          <span className="userFriendName">Boris</span>
        </div>
        <div className="userFriend">
          <img className="userFriendImg" src={PF + "/person/8.jpeg"} alt="" />
          <span className="userFriendName">PewDiePie</span>
        </div>
      </div>
    </>
  );
};
