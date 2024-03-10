import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import your CSS file for styling

const Sidebar = () => {
  const [isCollapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      {!isCollapsed && <div className="brand-name">ImaginationInn</div>}
      <div className="toggle-btn" onClick={handleToggle}>
        {isCollapsed ? '>>' : '<<'}
      </div>
      {!isCollapsed && (
        <ul className="nav-list">
        <li className="nav-item"><Link to="/discoverbooks">Discover Books</Link></li>
        <li className="nav-item"><Link to="/mybooklist">My Book List</Link></li>
        <li className="nav-item"><Link to="/tobereadlist">TBR</Link></li>
        <li className="nav-item"><Link to="/groupchat">Group Chat</Link></li>
        <li className="nav-item"><Link to="/profile">Profile</Link></li>
      </ul>
      )}
      
    </div>
  );
};

export default Sidebar;
