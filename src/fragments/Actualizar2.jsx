import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


function Actualizar() {
  const navegation = useNavigate();
  useEffect(() => {
    navegation("/ordenes");
  }, []);
}
export default Actualizar;