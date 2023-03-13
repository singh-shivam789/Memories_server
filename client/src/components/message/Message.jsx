import React from 'react';
import "./message.css";
export default function Message({ own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg' src="https://yt3.ggpht.com/ytc/AL5GRJUOhe9c1D67-yLQEkT2EqyRclI5V3EOTANZQXmt=s48-c-k-c0x00ffffff-no-rj" alt="" />
                <p className='messageText'>hello this is a message</p>
            </div>
            <div className="messageTop">
                1 hour ago
            </div>
        </div>
    )
}
