import React from "react";
import Card from "./Card";
import '../css/Cards.css';
import { cardsData } from "../Data/Data";

const Cards = () => {
  return (
    <div className="cardsTitulo">
      <h3>Datos del Inventario</h3>
      <div className="Cards">
        
        {cardsData.map((card, id) => {
          return (
            <div key={id} className="parentContainer">
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
              />
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default Cards;
