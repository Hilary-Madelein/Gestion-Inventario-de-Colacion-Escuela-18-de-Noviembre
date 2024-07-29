import React, { useState, useEffect } from 'react';
import '../css/Updates.css';
import { borrarSesion, getBodega, getToken, saveBodega } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { ObtenerPost } from '../hooks/Conexion';
import { useNavigate } from 'react-router-dom';

const Updates = () => {
    const navigate = useNavigate();
    const [bodegaData, setBodegaData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataOut = async () => {
            try {
                const info = await ObtenerPost(getToken(), 'obtener/bodega', { externalId: "644f189d-4151-481f-92be-58b7fa7b229a" });

                if (info.code !== 200) {
                    mensajes(info.msg, 'error');
                    if (info.msg === 'Acceso denegado. Token ha expirado') {
                        borrarSesion();
                        navigate("/login");
                    }
                } else {
                    setBodegaData(info.info);
                    saveBodega(info.info.id);
                }
            } catch (error) {
                mensajes("Error al cargar los datos: " + error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchDataOut();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!bodegaData) {
        return <div>Sin datos disponibles</div>;
    }

    return (
        <div className="updateData">
            <h3>Datos de la Bodega</h3>
            <div className="Updates">
                <div style={{ marginBottom: '0.5rem' }}>
                    <span className='codigo' style={{ fontWeight: 'bold', fontSize: '20px' }}>{bodegaData.code}</span><br />
                    <ul>
                        <li><span><strong>BLOQUE:</strong> {bodegaData.location.block}</span></li>
                        <li><span><strong>NRO. AULA:</strong> {bodegaData.location.roomNumber}</span></li>
                        <li><span><strong>PARALELO:</strong> {bodegaData.location.parallel}</span></li>
                        <li><span><strong>GRADO:</strong> {bodegaData.location.level}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Updates;
