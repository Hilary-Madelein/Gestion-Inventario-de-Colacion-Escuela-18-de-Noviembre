import React, { useState } from 'react';
import '../css/Dashboard.css';
import Sidebar from './Sidebar';
import Cards from "./Cards";
import TableData from "./TableData";
import '../css/MainDash.css';
import '../css/global.css';
import RightSide from './RightSide';

const Dashboard = () => {
  const [kardex, setKardex] = useState(null); // Estado para almacenar el kardex

  return (
    <div className="Dashboard">
      <div className="DashboardGlass">
        <Sidebar />
        <div className="MainDash">
          <h1>Dashboard</h1>
          <Cards kardexId={kardex ? kardex.id : null} /> {/* Pasar el kardexId a Cards */}
          <div className="tabla">
            <TableData />
          </div>
        </div>
        <RightSide onKardexChange={setKardex} /> {/* Pasar setKardex como onKardexChange */}
      </div>
    </div>
  );
};

export default Dashboard;
