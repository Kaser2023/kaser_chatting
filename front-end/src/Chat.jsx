// import React from "react";
import React, { useEffect, useState } from "react";

import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { Button } from "@mui/material";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import axios from './axios';


function Chat({ messages }) {
  // Debugging to check if the "messages" Received from App or not!
  //  So Important!
  console.log("Messages received in Chat:", messages);

  const [input, setInput] = useState("");


  const sendMessage = async(e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      name: "Kaser_whatsApp",
      message: input,
      timestamp: "Just now",
      received: false
    });

    
    setInput("");
  };

  return (
    <div className="chat">
      {/* chat_header */}
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <ZoomInOutlinedIcon
            // sx={{ marginRight: "2vw", fontSize: "24px" }}
            />
          </IconButton>

          <IconButton>
            <AttachFileOutlinedIcon
            // sx={{  marginRight: "2vw", fontSize: "24px" }}
            />
          </IconButton>

          <IconButton>
            <MoreVertIcon
            // sx={{  fontSize: "24px" }}
            />
          </IconButton>
        </div>
      </div>

      {/* chat_body */}
      <div className="chat_body">
        {messages.map((message) => {
          <p
            key={message.key}
            className={`chat_message ${message.received && "chat_receiver"}`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>;
        })}

        {messages.map((message) => (
          <p
            key={message.key} // Ensure each message has a unique key
            className={`chat_message ${message.received && "chat_receiver"}`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      {/* chat_footer */}

      <div className="chat_footer">
        <InsertEmoticonOutlinedIcon sx={{ padding: "10px", color: "gray" }} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>

        <MicOutlinedIcon sx={{ padding: "10px", color: "gray" }} />
      </div>
    </div>
  );
}

export default Chat;
