import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { ObtenerGet, ObtenerPost, PostGuardar } from '../hooks/Conexion';
import Form from 'react-bootstrap/Form';

function AgregarEntrada() {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [dataLotes, setDataLotes] = useState([]);
    const [data, setData] = useState([]);
    const [loteSeleccionado, setLoteSeleccionado] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await ObtenerGet(getToken(), 'listar/lote');
                if (info.code !== 200) {
                    if (info.msg === 'Acceso denegado. Token ha expirado') {
                        mensajes(info.msg, 'error');
                        borrarSesion();
                        navigate("/login");
                    } else {
                        mensajes(info.msg, 'error');
                    }
                } else {
                    setDataLotes(info.info);
                }
            } catch (error) {
                mensajes("Error al cargar los datos: " + error.message, 'error');
            } 
        };

        fetchData();
    }, [navigate]);

    console.log("ssss", loteSeleccionado);

    useEffect(() => {
        if (loteSeleccionado) {
            const fetchData = async () => {
                try {
                    const info = await ObtenerPost(getToken(), 'obtener/cantidad', { idBatch: loteSeleccionado });
                    if (info.code !== 200) {
                        mensajes(info.msg, 'error');
                        if (info.msg === 'Acceso denegado. Token ha expirado') {
                            borrarSesion();
                            navigate("/login");
                        }
                    } else {
                        setData(info.info);
                        setValue('quantity', info.info.quantity);
                    }
                } catch (error) {
                    mensajes("Error al cargar los datos: " + error.message, 'error');
                } 
            };

            fetchData();
        }
    }, [loteSeleccionado, navigate, setValue]);

    const onSubmit = (data) => {
        var datos = {
            "external_kardex": "a1768f31-fc59-46bf-b49a-cfa814b02fdb",
            "quantity": parseInt(data.quantity, 10),
            "detail": data.detail,
            "movementType": "SALIDA EXTERNA",
            "originWarehouseId": "0094193e-2149-4dbd-a075-b9ae6bbd1f79",
            "destinationWarehouseId": null,
            "batchId": loteSeleccionado
        };
        PostGuardar(datos, getToken(), 'registrarSalidaExterna/itemKardex').then((info) => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
                navigate('/ordenes');
            } else {
                mensajes(info.msg);
                navigate('/actualizar2');
            }
        });
    };

    console.log("aaa", data);

    return (
        <div className="wrapper">
            <Form className="user" onSubmit={handleSubmit(onSubmit)}>

                {/* SELECCIONAR LOTE */}
                <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold'}}>Código de Lote</Form.Label>
                    <Form.Control as="select" {...register('batchId', { required: 'Seleccione un lote' })} onChange={e => setLoteSeleccionado(e.target.value)}>
                        <option value="">Seleccione un lote</option>
                        {dataLotes.map((lote) => (
                            <option key={lote.id} value={lote.id}>{lote.code}</option> // Cambiado para usar el ID del lote
                        ))}
                    </Form.Control>
                    {errors.batchId && <div className='alert alert-danger'>{errors.batchId.message}</div>}
                </Form.Group>

                {/* INGRESAR CANTIDAD */}
                <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Cantidad</Form.Label>
                    <Form.Control type="number" {...register('quantity', { required: 'Ingrese una cantidad' })} placeholder="Ingrese la cantidad" readOnly={Boolean(data.quantity)} />
                    {errors.quantity && <div className='alert alert-danger'>{errors.quantity.message}</div>}
                </Form.Group>

                {/* INGRESAR DESCRIPCION */}
                <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold'}}>Detalle</Form.Label>
                    <Form.Control as="textarea" rows={5} {...register('detail', { required: true })} placeholder="Ingrese el detalle" />
                    {errors.detail && <div className='alert alert-danger'>Ingrese un detalle</div>}
                </Form.Group>

                <div style={{ display: 'flex', gap: '10px', paddingTop: '10px' }}>
                    <button className="btn btn-danger btn-rounded" type="button" onClick={() => navigate('/ordenes')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        <span style={{ padding: '5px', fontWeight: 'bold' }}>Cancelar</span>

                    </button>
                    <button className="btn btn-success btn-rounded" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                        </svg>
                        <span style={{ padding: '5px', fontWeight: 'bold' }}>Registrar</span>
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default AgregarEntrada;
