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
import EditarProducto from './EditarProducto';
import DeatallesProducto from './DetallesProducto';

const Productos = () => {

    //SHOW AGREGAR
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //SHOW EDITAR
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit= () => setShowEdit(true);

    //SHOW DETALLES
    const [showDetalles, setShowDetalles] = useState(false);
    const handleCloseDetalles = () => setShowDetalles(false);
    const handleShowDetalles = () => setShowDetalles(true);

    return (
        <div className="Productos">
            <Sidebar />
            <div className="Productos-main">
                <div className="Productos-header">
                    <h1>Productos</h1>
                    <div className="boton">
                        <Button variant="contained" color="success" className="addButton" onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5" />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                            </svg>
                            <span style={{ marginLeft: '8px',fontWeight:'bold' }}>Agregar Producto</span>
                        </Button>
                    </div>

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
                                    <Button size="small" style={{color: 'var(--green)'}} onClick={handleShowEdit}>Editar</Button>
                                    <Button size="small" style={{color: 'var(--green)'}} onClick={handleShowDetalles}>Mas detalles</Button>
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
                    <Modal.Header style={{background: 'var(--green)'}}>
                        <Modal.Title style={{ fontWeight: 'bold', color: 'var(--white)' }}>Agregar producto
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AgregarProducto />

                    </Modal.Body>

                    <Modal.Footer style={{background: 'var(--green)'}}>
                        <Button variant="secondary" onClick={() => { handleClose(); }} style={{ fontWeight: 'bold', color: 'var(--white)' }}>
                            Cerrar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

            {/* < VENTANA MODAL DETALLES> */}
            <div className="model_box">
                <Modal
                    show={showDetalles}
                    onHide={handleCloseDetalles}
                    backdrop="static"
                    style={{ '--bs-modal-width': '75%' }}
                    keyboard={false}
                >
                    <Modal.Header style={{background: 'var(--green)'}}>
                        <Modal.Title style={{ fontWeight: 'bold', color: 'var(--white)' }}>Detalles producto
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeatallesProducto />

                    </Modal.Body>

                    <Modal.Footer style={{background: 'var(--green)'}}>
                        <Button variant="secondary" onClick={() => { handleCloseDetalles(); }} style={{ fontWeight: 'bold', color: 'var(--white)' }}>
                            Cerrar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

            {/* < VENTANA MODAL EDITAR> */}
            <div className="model_box">
                <Modal
                    show={showEdit}
                    onHide={handleCloseEdit}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header style={{background: 'var(--green)'}}>
                        <Modal.Title style={{ fontWeight: 'bold', color: 'var(--white)' }}>Editar producto
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditarProducto />

                    </Modal.Body>

                    <Modal.Footer style={{background: 'var(--green)'}}>
                        <Button variant="secondary" onClick={() => { handleCloseEdit(); }} style={{ fontWeight: 'bold', color: 'var(--white)' }}>
                            Cerrar
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>


    );
};

export default Productos;
