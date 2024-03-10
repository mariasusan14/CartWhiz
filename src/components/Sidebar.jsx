import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg"

const Sidebar = () => {
  const [isCollapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar-container fixed ${isCollapsed ? 'collapsed' : ''} bg-blue-200 w-150 h-screen`}>
      {!isCollapsed && <div className="brand-name">ImaginationInn</div>}
      <img
        src={Logo}
        alt="logo"
        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
      /><div className="toggle-btn" onClick={handleToggle}>
        {isCollapsed ? '>>' : '<<'}
      </div>
      {!isCollapsed && (
      
      <div className="nav-list">
      <div className="nav-item mt-10 mb-9">
        <div className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
          <a href="/discoverbooks">Discover Books</a>
        </div>
      </div>
      <div className="nav-item mb-9">
        <div className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
          <a href="/mybooklist">My Book List</a>
        </div>
      </div>
      <div className="nav-item mb-9">
        <div className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
          <a href="/tobereadlist">To Be Read List</a>
        </div>
      </div>
      <div className="nav-item mb-9">
        <div className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
          <a href="/groupchat">Group Chat</a>
        </div>
      </div>
      <div className="nav-item ">
        <div className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
          <a href="/profile">Profile</a>
        </div>
      </div>
    </div>
    

      )}
      
    </div>
  );
};

export default Sidebar;
