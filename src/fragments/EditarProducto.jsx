import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

function EditarProducto() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [validated, setValidated] = useState(false);
    const navegation = useNavigate();
    //const [colores, setColores] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [llmarcas, setLlmarcas] = useState(false);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState([]);

    //acciones
    // onsubmit
    const onSubmit = (data) => {
        /*var datos = {
          "modelo": data.vane,
          "kilometraje": data.kilometraje,
          "anioFabricacion": data.anioFabricacion,
          "external_marca": marcaSeleccionada,
          "precio": data.precio,
          "color": data.color,
          "placa": data.placa
        };
        console.log("estos van", datos);
        GuardarAuto(datos, getToken()).then((info) => {
          if (info.code !== 200) {
            mensajes(info.msg, 'error', 'Error');          
          } else {
            mensajes(info.msg);
            navegation('/autosdisponibles');
          }     
        }
        );*/
    };



    /*if (!llmarcas) {
      Marca(getToken()).then((info) => {
        if (info.code !== 200 && info.msg == 'Acceso denegado. Token ha expirado') {
          borrarSesion();
          mensajes(info.msg);
          navegation("/sesion");
        } else {
          setMarcas(info.info);
          setLlmarcas(true);
        }
      });
    }*/


    return (
        <div className="wrapper">
            <div className="d-flex flex-column">
                <div className="content">

                    <div className='container-fluid'>
                        <div className="col-lg-10">
                            <div className="p-5">

                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                    {/** INGRESAR NOMBRE */}
                                    <div className="form-group mb-3">
                                        <Form.Label style={{fontWeight:'bold'}}>Nombre</Form.Label>
                                        <input type="text" {...register('nombre', { required: true })} className="form-control form-control-user" placeholder="Ingrese el nombre" />
                                        {errors.nombre && errors.nombre.type === 'required' && <div className='alert alert-danger'>Ingrese un nombre</div>}
                                    </div>

                                    {/** INGRESAR CATEGORIA */}
                                    <div className="form-group mb-3">
                                        <Form.Label style={{fontWeight:'bold'}}>Categoría</Form.Label>
                                        <input type="text" className="form-control form-control-user" placeholder="Ingrese la categoría" {...register('categoria', { required: true })} />
                                        {errors.categoria && errors.categoria.type === 'required' && <div className='alert alert-danger'>Ingrese una categoría</div>}
                                    </div>

                                    {/** INGRESAR FECHA CADUCIDAD */}
                                    <div className="form-group mb-3">
                                        <Form.Label style={{fontWeight:'bold'}}>Fecha de Caducidad</Form.Label>
                                        <input type="date" className="form-control form-control-user" placeholder="Ingrese la fecha de caducidad" {...register('fechaCaducidad', { required: true })} />
                                        {errors.fechaCaducidad && errors.fechaCaducidad.type === 'required' && <div className='alert alert-danger'>Ingrese una fecha de caducidad</div>}
                                    </div>

                                    {/** INGRESAR EXISTENCIA MAXIMA Y MINIMA */}
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="form-group me-2 flex-fill">
                                            <Form.Label style={{fontWeight:'bold'}}>Existencia Máxima</Form.Label>
                                            <input type="number" className="form-control form-control-user" placeholder="Ingrese la existencia máxima" {...register('existenciaMaxima', { required: true })} />
                                            {errors.existenciaMaxima && errors.existenciaMaxima.type === 'required' && <div className='alert alert-danger'>Ingrese una existencia máxima</div>}
                                        </div>
                                        <div className="form-group ms-2 flex-fill">
                                            <Form.Label style={{fontWeight:'bold'}}>Existencia Mínima</Form.Label>
                                            <input type="number" className="form-control form-control-user" placeholder="Ingrese la existencia mínima" {...register('existenciaMinima', { required: true })} />
                                            {errors.existenciaMinima && errors.existenciaMinima.type === 'required' && <div className='alert alert-danger'>Ingrese una existencia mínima</div>}
                                        </div>
                                    </div>

                                    <hr />

                                    {/** INGRESAR DESCRIPCION */}
                                    <div className="form-group mb-3">
                                        <Form.Label style={{ fontWeight: 'bold' }}>Descripción</Form.Label>
                                        <textarea className="form-control form-control-user" placeholder="Ingrese la descripción" {...register('descripcion', { required: true })} rows={5} />
                                        {errors.descripcion && errors.descripcion.type === 'required' && <div className='alert alert-danger'>Ingrese una descripción</div>}
                                    </div>

                                    {/** SELECCIONAR FOTO */}
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label style={{fontWeight:'bold'}}>Seleccionar foto</Form.Label>
                                        <Form.Control type="file" multiple />
                                    </Form.Group>

                                    {/** BOTONES */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <a href="/productos" className="btn btn-danger btn-rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                            <span style={{ marginLeft: '5px', fontWeight:'bold' }}>Cancelar</span>
                                        </a>
                                        <a href="/productos" className="btn btn-success btn-rounded" type='submit' value='Registrar' >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                            </svg>
                                            <span style={{ marginLeft: '5px', fontWeight:'bold' }}>Guardar</span>
                                        </a>


                                    </div>
                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditarProducto;