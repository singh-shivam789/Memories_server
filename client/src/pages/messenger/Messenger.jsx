import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import "./messenger.css";
export default function Messenger() {
  return (
    <>
      <Topbar />
      <div className="Messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input className="chatMenuInput" type="text" placeholder="Search for friends..." />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop"></div>
            <div className="chatBoxBottom"></div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  );
}
