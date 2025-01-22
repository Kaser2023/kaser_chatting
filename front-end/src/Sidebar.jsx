import React from "react";
import "./Sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Button } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">

      {/*  sidebar_header  */}
      <div className="sidebar_header">
        <Avatar src="https://media.licdn.com/dms/image/v2/D4D03AQHGQFCU7AwKfA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1687464535367?e=1743033600&v=beta&t=yap2OOFe84go7w2Gcd9-prOIsn0yz_c0QtJMz0blOGQ" />

        <div className="sidebar_headerRight">
          <Button>
            <DonutLargeIcon sx={{ marginLeft: "2vw", marginRight:"2vw", fontSize: "24px" }} />
          </Button>

          <Button>
            <ChatIcon sx={{ marginRight: "2vw", fontSize: "24px" }} />
          </Button>

          <Button>
            <MoreVertIcon sx={{ marginRight: "2vw", fontSize: "24px" }} />
          </Button>
        </div>
      </div>

      
      {/* sidebar_search */}
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
      <ZoomInOutlinedIcon sx={{ color: "gray", padding: "10px" }} />
      <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      {/* sidebar_Chats  */}
      <div className="sidebar_chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
  



      </div>


    </div>
  );
}

export default Sidebar;
