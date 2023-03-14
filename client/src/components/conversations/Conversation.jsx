import axios from 'axios';
import React, { useEffect, useState, memo } from 'react'
import "./conversation.css";

 function Conversation({conversation, currentUser}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [User, setUser] = useState(null);
    useEffect(() => {
        const UserId = conversation.members.find((id) => id !== currentUser._id)
        const getUser = async () => {
            const res = await axios.get(`/users?userId=${UserId}`);
            setUser(res.data);
        }
        getUser();
    }, [currentUser, conversation]);
    console.log(User)
    return (
        <div className='conversation'>
            <img src={
              User?.profilePicture
                ? PF + "person/" + User?.profilePicture
                : PF + "/person/0.jpeg"
            } alt="" className="conversationImg" />
            <span className="conversationName">{User?.username}</span>
        </div>
    )
}

export default memo(Conversation);