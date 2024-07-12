import React from 'react';
import '../css/Dashboard.css';
import Sidebar from './Sidebar';
import Card from "./Cards";
import TableData from "./TableData";
import '../css/MainDash.css';
import RightSide from './RightSide';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="DashboardGlass">
        <Sidebar />
        <div className="MainDash">
          <h1>Dashboard</h1>
          <Card />
          <TableData />
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default Dashboard;
