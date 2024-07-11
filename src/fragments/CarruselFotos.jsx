import React from "react";
import Slider from "react-slick";
import '../css/Carrusel.css'; 
import foto1 from '../img/fondo1.png';
import foto2 from '../img/fondo2.png';
import foto3 from '../img/fondo3.png';

const CarruselFotos = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>
            <div className="foto">
                <img src={foto1} alt="Escuela 18 de Noviembre" />
            </div>
            <div>
                
            </div>
            <div>
                <img src={foto3} alt="Escuela 18 de Noviembre" />
            </div>
            <div>

            </div>
            <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div>
        </Slider>
    );
}

export default CarruselFotos;