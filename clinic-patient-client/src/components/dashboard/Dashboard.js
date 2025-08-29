// Dashboard.js
import React from 'react';
import Home from './Home';
import BarChart from './BarChart';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      {/* Bar chart section */}
      <div className="top-chart-section">
        <div className="chart-container">
          <BarChart />
        </div>
      </div>
 
      {/* Main content */}
      <div className="dashboard-content">
        <main className="main-content">
          <Home />
        </main>
      </div>
    </>
  );
};

export default Dashboard;