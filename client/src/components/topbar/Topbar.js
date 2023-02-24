import "./topbar.css";
import { Link } from "react-router-dom";
import { Search, Person, Notifications, Chat } from "@material-ui/icons";
export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          <span className="title">Memories</span>
        </Link>
      </div>

      <div className="topbarCentre">
        <div className="searchbar">
          <Search className="searchIcon"></Search>
          <input
            placeholder="Search for your friends, posts, or videos!"
            type="text"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <div className="topbarLink">Homepage</div>
          <div className="topbarLink">Timeline</div>
        </div>
        <div className="topbarIcons">
          <div className="topbarIcon">
            <Person></Person>
            <span className="topbarIconNotificationCount">1</span>
          </div>
          <div className="topbarIcon">
            <Chat />
            <span className="topbarIconNotificationCount">1</span>
          </div>
          <div className="topbarIcon">
            <Notifications></Notifications>
            <span className="topbarIconNotificationCount">1</span>
          </div>
        </div>
        <div className="topbarProfilePictureContainer">
          <img
            src="/assets/person/1.jpeg"
            alt=""
            className="topbarProfilePicture"
          />
        </div>
      </div>
    </div>
  );
}
