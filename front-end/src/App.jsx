import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Button from '@mui/material/Button';


function App() {
  return (
    <div className="app">

      <div className="app_body">
      <Sidebar />
      <Chat />
      </div>

    </div>
  );
}

export default App;
