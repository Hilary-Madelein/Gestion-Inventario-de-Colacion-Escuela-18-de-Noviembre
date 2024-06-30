import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { estaSesion, getRol } from './utils/SessionUtil';
import Login from './fragments/Login';

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

        {/* Ruta para cuando el usuario está autenticado */}
        <Route path='/principalusuario' element={<MiddewareSesion><div>Principal Usuario</div></MiddewareSesion>} />

        {/* Ruta para cuando el usuario tiene el rol ADMINISTRADOR */}
        <Route path='/admin' element={<MiddewareRol><div>Admin Page</div></MiddewareRol>} />

        {/* Ruta para cualquier URL no definida */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
