import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { estaSesion, getRol } from './utils/SessionUtil';
import Login from './fragments/Login';
import Dashboard from './fragments/Dashboard';
import Productos from './fragments/Productos';
import AgregarProducto from './fragments/AgregarProducto';
import './css/global.css';
import "bootstrap/dist/css/bootstrap.min.css";
import DetallesProducto from './fragments/DetallesProducto';
import Ordenes from './fragments/Ordenes';
import Actualizar from './fragments/Actualizar';
import Actualizar2 from './fragments/Actualizar2';

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
        <Route path='/ordenes' element={<Ordenes />} />
        <Route path='/actualizar' element={<Actualizar />} />
        <Route path='/actualizar2' element={<Actualizar2 />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/detalles' element={<DetallesProducto />} />
        <Route path='/registroProducto' element={<AgregarProducto />} />
        <Route path='/principalusuario' element={<MiddewareSesion><div>Principal Usuario</div></MiddewareSesion>} />
        <Route path='/admin' element={<MiddewareRol><div>Admin Page</div></MiddewareRol>} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
