import React from "react";
import Sidebar from "./Sidebar";
import './dashboard.css'
const Dashboard = () => {
    return (
    <div className="dashboard-container">
        <Sidebar/>
        <div className="ml-40">
        <div className="container">
            <div className="feature">
            <h2>Discover Books</h2>
            <p>Explore a vast collection of books and discover your next favorite read.</p>
            </div>
            <div className="feature">
            <h2>Engage in Discussions</h2>
            <p>Join discussions with other book lovers, share your thoughts, and gain insights.</p>
            </div>
            <div className="feature">
            <h2>Build Your Book List</h2>
            <p>Create and manage your book list to keep track of what you want to read.</p>
            </div>
            </div>
        </div>
    
    </div>
    );
  };

  export default Dashboard;
