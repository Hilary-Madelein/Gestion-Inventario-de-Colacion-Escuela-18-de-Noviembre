import '../css/Detalles.css';
import { getCorreo, getRol, getUser } from '../utils/SessionUtil';
import React, { useEffect, useState } from 'react';
import productoPrueba from '../img/productoPrueba.jpg';

const DeatallesProducto = () => {
    const rol = getRol();
    const usuario = getUser();
    const correo = getCorreo();
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        if (usuario && usuario.nombres) {
            setNombreUsuario(usuario.nombres);
        }
    }, []);

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1);
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container-fluid">
            <div className="main-body" style={{ backgroundColor: '#e4e4e4', padding: '20px' }}>
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={productoPrueba} alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3">
                                        <h4 style={{ fontWeight: 'bold' }}>{"PROBANDO PROBANDO"}</h4>
                                        <p className="text-secondary mb-1">{"PROBANDO"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 className="mb-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="2" y1="12" x2="22" y2="12"></line>
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                        </svg>Proyecto de la UNL
                                    </h6>
                                    <span className="text-secondary">{"PROBANDO"}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body p-4">
                                <h6 style={{ fontWeight: 'bold' }}>Información personal</h6>
                                <hr className="mt-0 mb-4" />
                                <div className="row pt-1">
                                    <div className="col-6 mb-3">
                                        <h6>Correo electrónico</h6>
                                        <p className="text-muted">{"PROBANDO"}</p>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <h6>Fecha de nacimiento</h6>
                                        <p className="text-muted">{"PROBANDO"}</p>
                                    </div>
                                </div>
                                <h6 style={{ fontWeight: 'bold' }}>Información institucional</h6>
                                <hr className="mt-0 mb-4" />
                                <div className="row pt-1">
                                    <div className="col-6 mb-3">
                                        <h6>Cargo</h6>
                                        <p className="text-muted">{"PROBANDO"}</p>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <h6>Institución</h6>
                                        <p className="text-muted">{"PROBANDO"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeatallesProducto;
