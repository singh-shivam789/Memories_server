import axios from "axios";
import { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import {  useParams } from "react-router";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [User, setUser] = useState({});
  const params = useParams();
  const editProfilePicture = () => {
    console.log("clicked!");
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/users?username=${params.username}`);
      setUser(res.data.user);
    };
    fetch();
  }, [params]);
  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <Sidebar></Sidebar>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="coverPic"
                src={
                  User.coverPicture
                    ? PF + User.coverPicture
                    : PF + "/noCover.webp"
                }
                alt=""
              />
              <div className="profilePicContainer">
                <img
                  src={
                    User.profilePicture
                      ? PF + User.profilePicture
                      : PF + "person/0.jpeg"
                  }
                  alt=""
                />
                <CameraAltIcon
                  onClick={editProfilePicture}
                  className="cameraIcon"
                />
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileUserName">{User.username}</h4>
              <span className="profileUserDesc">{User.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <Rightbar setUser={setUser} user={User} />
          </div>
        </div>
      </div>
    </>
  );
}
