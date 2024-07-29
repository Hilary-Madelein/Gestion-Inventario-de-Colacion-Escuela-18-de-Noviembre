import React, { useState, useEffect } from 'react';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { ObtenerPost, URLBASE } from '../hooks/Conexion';
import { useNavigate } from 'react-router-dom';
import '../css/CustomerReviews.css';

const CustomerReview = ({ productoId, onKardexChange }) => { // Añadir onKardexChange prop
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataOut = async () => {
      if (!productoId) {
        setProductData(null);
        setLoading(false);
        onKardexChange(null);
        return;
      }

      try {
        const info = await ObtenerPost(getToken(), 'obtener/kardex/lote', { "productId": productoId, "warehouseId": 1 });

        if (info.code !== 200) {
          setProductData(null);
          mensajes(info.msg, 'info');
          if (info.msg === 'Acceso denegado. Token ha expirado') {
            borrarSesion();
            navigate("/login");
          }
        } else {
          setProductData(info.info);
          onKardexChange(info.info); // Pasar kardex info al padre
        }
      } catch (error) {
        setProductData(null);
        mensajes("Error al cargar los datos: " + error.message, 'info');
        onKardexChange(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataOut();
  }, [productoId, navigate, onKardexChange]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>Sin datos disponibles</div>;
  }

  const imageUrl = productData.product.photo ? `${URLBASE}/images/products/${productData.product.photo}` : '/images/default.jpg';

  return (
    <div className="CustomerReview">
      <h3>Datos del producto</h3>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={imageUrl} alt="Producto" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
        <span style={{ fontWeight: 'bold', fontSize: '20px', paddingTop: '20px' }}>{productData.product.name}</span>
        <ul>
          <li><span><strong>Existencia máxima:</strong> {productData.maximumStock}</span></li>
          <li><span><strong>Existencia mínima:</strong> {productData.minimumStock}</span></li>
          <li><span><strong>Categoría:</strong> {productData.product.category}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerReview;
