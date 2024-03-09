import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'
const Sidebar = () => {
    return (
        <div className="sidebar">
        <div >ImaginationInn</div>
        <ul>
            <li><Link to="/discoverbooks">Discover Books</Link></li>
            <li><Link to="/mybooklist">My Book List</Link></li>
            <li><Link to="/tobereadlist">To Be Read List</Link></li>
            <li><Link to="/groupchat">Group Chat</Link></li>
            <li><Link to="/profile">Profile</Link></li>       
        </ul>
      </div>
    );
  };

  export default Sidebar;
