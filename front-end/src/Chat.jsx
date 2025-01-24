import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { Button } from "@mui/material";
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';

function Chat() {
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
        <p className="chat_message">
          <span className="chat_name">Kaser</span>
          This is a message
          <span className="chat_timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat_message chat_receiver ">
          <span className="chat_name">Abdullah</span>
          This is a message
          <span className="chat_timestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chat_message">
          <span className="chat_name">Kaser</span>
          This is a message
          <span className="chat_timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      {/* chat_footer */}

      <div className="chat_footer">
        <InsertEmoticonOutlinedIcon sx={{ padding: "10px", color: "gray" }} />

        <form>
          <input placeholder="Type a message" type="text" />
          <button type="submit">Send a message</button>
        </form>

        <MicOutlinedIcon sx={{ padding: "10px", color: "gray" }} />
      </div>
    </div>
  );
}

export default Chat;
