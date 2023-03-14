import React, { memo, useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";

function Messenger() {
  const { user: currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")
  const [currentConversation, setCurrentConversation] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axios.get(`/conversations/${currentUser?._id}`);
      setConversations(res.data);
    }
    fetchConversations();    
  }, [currentUser]);

  useEffect(()=>{
    const fetchMessages = async () => {
      const res = await axios.get(`/messages/${currentConversation?._id}`);
      setMessages(res.data);
    }
    fetchMessages();    
  }, [currentConversation])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentConversation._id
    }

    const res = await axios.post("/messages", message);
    setMessages((prevState) => {
      return [...prevState, res.data];   
    });
    setNewMessage("");
  }
  return (
    <>
      <Topbar />
      <div className="Messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input className="chatMenuInput" type="text" placeholder="Search for friends..." />
            {conversations.map((conversation) => {
              return <div onClick={() => {
                setCurrentConversation(conversation);
              }}>
              <Conversation conversation = {conversation} currentUser = {currentUser}/>
              </div>
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentConversation ? <>
              <div className="chatBoxTop">
              {messages?.map(((message) => {
                return <div ref={scrollRef}>
                  <Message 
                  currentUser = {currentUser}
                  message = {message}
                  own = {message.sender === currentUser._id}
                />
                </div>
              }))}
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatBoxInput" placeholder="Write something..."  onChange={(e) => {
                setNewMessage(e.target.value)
              }}></textarea>
              <button onClick={handleSubmit} className="chatSubmitBtn">Send</button>
            </div>
              </> : <span className="noConversationText">Open a conversation to start a chat.</span>
            }
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

export default memo(Messenger);