import React from "react";
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
export default function Messenger() {
  return (
    <>
      <Topbar />
      <div className="Messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friends..." />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper"></div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  );
}
