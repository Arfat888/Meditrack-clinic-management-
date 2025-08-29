import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Dashboard.css"; 

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Navbar />
      <Sidebar />
      <div className="dashboard-content">
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
