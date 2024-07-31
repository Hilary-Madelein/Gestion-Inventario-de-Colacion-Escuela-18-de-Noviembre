import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { GuardarImages } from '../hooks/Conexion';

function AgregarProducto() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const categories = ["LECHE", "MASA HORNEADA", "BOCADITO DE SAL", "GRANOLA", "JUGO/NECTAR", "BARRA CEREAL", "BEBIDA A BASE DE LECHE"];

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('name', data.name.toUpperCase());
        formData.append('category', categoriaSeleccionada);
        formData.append('photo', data.photo[0]);

        GuardarImages(formData, getToken(), "/registrar/producto").then(info => {
            if (info.code !== 200) {
                mensajes(info.msg, 'error', 'Error');
                borrarSesion();
                navigate('/productos');
            } else {
                mensajes(info.msg);
                navigate('/actualizar');
            }
        });
    };

    return (
        <div className="wrapper">
            <form className="user" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="form-group mb-3">
                    <label style={{ fontWeight: 'bold', paddingTop: '10px' }}>Nombre</label>
                    <input type="text" {...register('name', { required: 'Ingrese un nombre' })} className="form-control form-control-user" placeholder="Ingrese el nombre" />
                    {errors.name && <div className='alert alert-danger'>{errors.name.message}</div>}
                </div>

                <div className="form-group mb-3">
                    <label style={{ fontWeight: 'bold', paddingTop: '20px' }}>Categoría</label>
                    <select
                        className="form-control form-control-user"
                        {...register('categoria', { required: 'Seleccione una categoría' })}
                        value={categoriaSeleccionada}
                        onChange={e => setCategoriaSeleccionada(e.target.value)}
                    >
                        <option value="">Seleccione</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    {errors.categoria && <div className='alert alert-danger'>{errors.categoria.message}</div>}
                </div>

                <div className="form-group mb-3">
                    <label style={{ fontWeight: 'bold', paddingTop: '20px' }}>Seleccionar foto</label>
                    <input type="file" {...register('photo')} className="form-control" />
                </div>

                <div style={{ display: 'flex', gap: '10px', paddingTop: '40px' }}>
                    <button className="btn btn-danger btn-rounded" type="button" onClick={() => navigate('/productos')}>
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
            </form>
        </div>
    );
}

export default AgregarProducto;