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
        mensajes(error.message, 'info');
        onKardexChange(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataOut();
  }, [productoId, navigate, onKardexChange]);

  const imageUrl = productData && productData.product.photo ? `${URLBASE}/images/products/${productData.product.photo}` : '/images/default.jpg';

  return (
    <div className="CustomerReview">
      <h3>Datos del producto</h3>
      <div className="product-details">
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : !productData ? (
          <div className="no-data">Sin datos disponibles</div>
        ) : (
          <>
            <img src={imageUrl} alt="Producto" className="product-image" />
            <span className="product-name">{productData.product.name}</span>
            <ul>
              <li><span><strong>Existencia máxima:</strong> {productData.maximumStock}</span></li>
              <li><span><strong>Existencia mínima:</strong> {productData.minimumStock}</span></li>
              <li><span><strong>Categoría:</strong> {productData.product.category}</span></li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerReview;
