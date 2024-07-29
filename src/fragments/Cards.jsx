import React, { useState, useEffect } from "react";
import Card from "./Card";
import '../css/Cards.css';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { ObtenerPost } from '../hooks/Conexion';
import { useNavigate } from 'react-router-dom';
import { UilClipboardAlt } from "@iconscout/react-unicons";

const Cards = ({ kardexId }) => { // Añadir kardexId prop
  const navigate = useNavigate();
  const [bodegaData, setBodegaData] = useState({
    porcentajeStock: 0,
    porcentajeEntradas: 0,
    porcentajeSalidas: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataOut = async () => {
      setLoading(true);
      setBodegaData({
        porcentajeStock: 0,
        porcentajeEntradas: 0,
        porcentajeSalidas: 0,
      });

      if (!kardexId) {
        setLoading(false);
        return;
      }

      try {
        const info = await ObtenerPost(getToken(), 'obtener/porcentajes', { kardexId });

        if (info.code !== 200) {
          mensajes(info.msg, 'error');
          if (info.msg === 'Acceso denegado. Token ha expirado') {
            borrarSesion();
            navigate("/login");
          }
        } else {
          setBodegaData(info.info);
        }
      } catch (error) {
        mensajes("Error al cargar los datos: " + error.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchDataOut();
  }, [kardexId, navigate]);

  const cardsData = [
    {
      title: "Stock",
      color: {
        backGround: "linear-gradient(180deg, #12372A 0%, #12372A 100%)",
      },
      barValue: bodegaData.porcentajeStock,
      value: `${bodegaData.porcentajeStock}%`,
      png: UilClipboardAlt,
      series: [
        {
          name: "Stock",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "Entradas",
      color: {
        backGround: "linear-gradient(180deg, #436850 0%, #436850 100%)",
      },
      barValue: bodegaData.porcentajeEntradas,
      value: `${bodegaData.porcentajeEntradas}%`,
      png: UilClipboardAlt,
      series: [
        {
          name: "Entradas",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Salidas",
      color: {
        backGround: "#508D69",
      },
      barValue: bodegaData.porcentajeSalidas,
      value: `${bodegaData.porcentajeSalidas}%`,
      png: UilClipboardAlt,
      series: [
        {
          name: "Salidas",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];

  return (
    <div className="cardsTitulo">
      <h3>Datos del Inventario del Producto</h3>
      <div className="Cards">
        {cardsData.map((card, id) => (
          <div key={id} className="parentContainer">
            <Card
              param={card}
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
