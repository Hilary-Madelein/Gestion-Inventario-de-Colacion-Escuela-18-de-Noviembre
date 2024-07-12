import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { estaSesion, getRol } from './utils/SessionUtil';
import Login from './fragments/Login';
import Dashboard from './fragments/Dashboard';
import Productos from './fragments/Productos';

function App() {
  const MiddewareSesion = ({ children }) => {
    const autenticado = estaSesion();
    if (autenticado) {
      return children;
    } else {
      return <Navigate to='/login' />;
    }
  };

  const MiddewareRol = ({ children }) => {
    const rol = getRol();
    if (rol === "ADMINISTRADOR") {
      return children;
    } else {
      return <Navigate to='/login' />;
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/principalusuario' element={<MiddewareSesion><div>Principal Usuario</div></MiddewareSesion>} />
        <Route path='/admin' element={<MiddewareRol><div>Admin Page</div></MiddewareRol>} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
