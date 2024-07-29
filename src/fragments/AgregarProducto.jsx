import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { GuardarImages } from '../hooks/Conexion';
import swal from 'sweetalert';
import '../css/AgregarProducto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AgregarProducto() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [errorImage, setErrorImage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const categories = ["LECHE", "MASA HORNEADA", "BOCADITO DE SAL", "GRANOLA", "JUGO/NECTAR", "BARRA CEREAL", "BEBIDA A BASE DE LECHE"];

    const onSubmit = data => {
        if (data.photo[0].size > 2 * 1024 * 1024) {
            setErrorImage('La imagen es muy pesada, debe ser menor a 2MB');
            return;
        }

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

    const handleCancelClick = () => {
        swal({
            title: "¿Está seguro de cancelar el registro del producto?",
            text: "Una vez cancelado, no podrá revertir esta acción",
            icon: "warning",
            buttons: ["No", "Sí"],
            dangerMode: true,
        }).then((willCancel) => {
            if (willCancel) {
                mensajes("Movimiento cancelado", "info", "Información");
                navigate('/actualizar');
            } 
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 2 * 1024 * 1024) {
            setImagePreview(URL.createObjectURL(file));
            setErrorImage('');
        } else {
            setImagePreview(null);
            setErrorImage('La imagen es muy pesada, debe ser menor a 2MB');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.size <= 2 * 1024 * 1024) {
            setImagePreview(URL.createObjectURL(file));
            setErrorImage('');
        } else {
            setImagePreview(null);
            setErrorImage('La imagen es muy pesada, debe ser menor a 2MB');
        }
        setIsDragging(false);
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
                    <div 
                        className={`image-upload-wrapper ${isDragging ? 'dragging' : ''}`} 
                        onDrop={handleDrop} 
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onClick={() => document.getElementById('photo').click()}
                    >
                        <input
                            id="photo"
                            type="file"
                            className="form-control-file"
                            {...register('photo', { required: 'Suba una foto' })}
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="photo" className="image-upload-label">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Vista previa de la foto" className="img-thumbnail" />
                            ) : (
                                <div className="image-upload-placeholder">
                                    <FontAwesomeIcon icon={faPlus} className="fa-icon" />
                                    <p>Agregar una imagen</p>
                                </div>
                            )}
                        </label>
                    </div>
                    {errors.photo && <div className='alert alert-danger'>{errors.photo.message}</div>}
                    {errorImage && <div className='alert alert-danger'>{errorImage}</div>}
                </div>

                <div style={{ display: 'flex', gap: '10px', paddingTop: '40px' }}>
                    <button className="btn btn-danger btn-rounded" type="button" onClick={handleCancelClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        <span style={{ padding: '5px', fontWeight: 'bold' }}>Cancelar</span>
                    </button>
                    <button className="btn btn-success btn-rounded" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
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
