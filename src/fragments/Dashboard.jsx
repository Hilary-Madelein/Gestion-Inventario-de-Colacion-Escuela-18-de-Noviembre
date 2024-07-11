import React from 'react';
import '../css/Dashboard.css';
import Sidebar from './Sidebar';
import MainDash from './MainDash';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="DashboardGlass">
        {/* Contenido del dashboard aquí */}
        <Sidebar></Sidebar>
        <MainDash></MainDash>
      </div>
    </div>
  );
};

export default Dashboard;
