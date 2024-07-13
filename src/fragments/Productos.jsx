import React, { useState } from 'react';
import '../css/Productos.css';
import '../css/global.css';
import Sidebar from './Sidebar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import productoPrueba from '../img/productoPrueba.jpg';
import AgregarProducto from './AgregarProducto';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from 'react-bootstrap';

const Productos = () => {

    //SHOW AGREGAR
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="Productos">
            <Sidebar />
            <div className="Productos-main">
                <div className="Productos-header">
                    <h1>Productos</h1>
                    <Button variant="contained" color="success" className="addButton" onClick={handleShow}>Agregar Producto</Button>
                </div>
                <div className="Productos-content">
                    <h2>Productos Disponibles</h2>
                    <div className="CardContainer">
                        {[...Array(11)].map((_, index) => (
                            <Card key={index} sx={{ maxWidth: 200, margin: 2 }}>
                                <CardMedia
                                    sx={{ height: 150 }}
                                    image={productoPrueba}
                                    title="Producto prueba"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Producto {index + 1}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Descripción del producto {index + 1}.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Editar</Button>
                                    <Button size="small">Mas detalles</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            {/* < VENTANA MODAL AGREGAR> */}
            <div className="model_box">
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AgregarProducto />

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { handleClose(); }}>
                            Cerrar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>


    );
};

export default Productos;
