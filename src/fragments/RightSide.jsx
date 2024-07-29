import React, { useState, useEffect } from 'react';
import '../css/RightSide.css';
import Updates from "./Updates";
import CustomerReview from "./CustomerReview";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ObtenerGet } from '../hooks/Conexion';
import { borrarSesion, getToken, saveProductoRegistrado } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { useForm } from 'react-hook-form';

const RightSide = ({ onKardexChange }) => { // Añadir onKardexChange prop
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataProduct, setDataProduct] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await ObtenerGet(getToken(), 'listar/producto');
                if (info.code !== 200) {
                    if (info.msg === 'Acceso denegado. Token ha expirado') {
                        mensajes(info.msg, 'error');
                        borrarSesion();
                        navigate("/login");
                    } else {
                        mensajes(info.msg, 'error');
                    }
                } else {
                    setDataProduct(info.info);
                }
            } catch (error) {
                mensajes("Error al cargar los datos: " + error.message, 'error');
            } 
        };

        fetchData();
    }, [navigate]);

    const handleProductoChange = (e) => {
        const selectedProductId = e.target.value;
        const selectedProduct = dataProduct.find(product => product.id.toString() === selectedProductId);
        setProductoSeleccionado(selectedProduct); // Actualizar el estado del producto seleccionado
        if (selectedProduct) {
            saveProductoRegistrado(selectedProductId); // Guardar el ID del producto seleccionado
        }
    };

    return (
        <div className="RightSide">
            <div className="producto">
                <Form.Group className="mb-3">
                    <Form.Label style={{fontWeight: 'bold'}}>Producto</Form.Label>
                    <Form.Control as="select" {...register('productId', { required: 'Seleccione un producto' })} onChange={handleProductoChange}>
                        <option value="">Seleccione un producto</option>
                        {dataProduct.map((product) => (
                            <option key={product.id} value={product.id.toString()}>{product.name}</option>
                        ))}
                    </Form.Control>
                    {errors.productId && <div className='alert alert-danger'>{errors.productId.message}</div>}
                </Form.Group>
            </div>
            <div>
                <Updates />
            </div>

            <div>
                <CustomerReview productoId={productoSeleccionado ? productoSeleccionado.id : null} onKardexChange={onKardexChange} />
            </div>
        </div>
    )
}

export default RightSide;
