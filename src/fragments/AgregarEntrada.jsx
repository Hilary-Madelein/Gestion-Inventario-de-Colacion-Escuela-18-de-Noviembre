import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { PostGuardar } from '../hooks/Conexion';
import Form from 'react-bootstrap/Form';

function AgregarEntrada() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        var datos = {
            "external_kardex": "a6aafe75-e685-4017-bd48-d011c99e5435",
            "quantity": parseInt(data.quantity, 10),
            "detail": data.detail,
            "movementType": "ENTRADA EXTERNA",
            "originWarehouseId": null,
            "destinationWarehouseId": "644f189d-4151-481f-92be-58b7fa7b229a",
            "code": data.code,
            "expirationDate": data.expirationDate,
            "expiryDate": data.expiryDate,
        };
        PostGuardar(datos, getToken(), 'registrarEntradaExterna/itemKardex').then((info) => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
                navigate('/ordenes');
            } else {
                mensajes(info.msg);
                navigate('/actualizar2');
            }
        });
    };

    return (
        <div className="wrapper">
            <Form className="user" onSubmit={handleSubmit(onSubmit)}>

                {/* INGRESAR CODIGO LOTE */}
                <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold'}}>Nro. Lote</Form.Label>
                    <Form.Control type="text" {...register('code', { required: 'Ingrese un nro' })} placeholder="Ingrese un nro" />
                    {errors.code && <div className='alert alert-danger'>{errors.code.message}</div>}
                </Form.Group>

                {/* INGRESAR CANTIDAD */}
                <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold'}}>Cantidad</Form.Label>
                    <Form.Control type="number" {...register('quantity', { required: 'Ingrese una cantidad' })} placeholder="Ingrese la cantidad" />
                    {errors.quantity && <div className='alert alert-danger'>{errors.quantity.message}</div>}
                </Form.Group>

                {/* INGRESAR DESCRIPCION */}
                <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold'}}>Detalle</Form.Label>
                    <Form.Control as="textarea" rows={5} {...register('detail', { required: true })} placeholder="Ingrese el detalle" />
                    {errors.detail && <div className='alert alert-danger'>Ingrese un detalle</div>}
                </Form.Group>

                {/* INGRESAR FECHA CADUCIDAD Y FECHA DE ELABORACION */}
                <div className="d-flex justify-content-between mb-3">
                <Form.Group className="ms-2 flex-fill">
                        <Form.Label style={{fontWeight: 'bold'}}>Fecha de elaboración</Form.Label>
                        <Form.Control type="date" {...register('expiryDate', { required: true })} />
                        {errors.expiryDate && <div className='alert alert-danger'>Ingrese una fecha de elaboración</div>}
                    </Form.Group>
                    
                    <Form.Group className="me-2 flex-fill">
                        <Form.Label style={{fontWeight: 'bold'}}>Fecha de expiración</Form.Label>
                        <Form.Control type="date" {...register('expirationDate', { required: true })} />
                        {errors.expirationDate && <div className='alert alert-danger'>Ingrese una fecha de expiración</div>}
                    </Form.Group>
                    
                </div>

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
