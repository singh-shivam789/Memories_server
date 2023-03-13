import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import "./messenger.css";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
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
            <div className="chatBoxTop">
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatBoxInput" placeholder="Write something..." ></textarea>
              <button className="chatSubmitBtn">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline /><ChatOnline /><ChatOnline /><ChatOnline /><ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
