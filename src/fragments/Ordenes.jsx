import React, { useState, useEffect } from 'react';
import '../css/TableData.css';
import '../css/TablaOrdenes.css';
import '../css/global.css';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { default as MuiTable } from '@mui/material/Table';
import SideBar from "./Sidebar";
import { Modal } from 'react-bootstrap';
import AgregarEntrada from './AgregarEntrada';
import AgregarSalida from './AgregarSalida';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';
import { Obtener, ObtenerGet, ObtenerPost } from '../hooks/Conexion';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'date', label: 'Fecha', minWidth: 50 },
    { id: 'code', label: 'Código', minWidth: 100, align: 'left' },
    { id: 'detail', label: 'Detalle', minWidth: 200 },
    { id: 'quantity', label: 'Cantidad', minWidth: 20, align: 'left' },
    { id: 'existence', label: 'Existencia', minWidth: 20, align: 'left' },
    { id: 'expiryDate', label: 'Fecha de elaboración', minWidth: 100, align: 'left' },
    { id: 'expirationDate', label: 'Fecha de expiración', minWidth: 100, align: 'left' },
];

function createData(date, code, detail, quantity, existence, expiryDate, expirationDate) {
    return { date, code, detail, quantity, existence, expiryDate, expirationDate };
}

const Ordenes = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //SHOW AGREGAR ENTRADA
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //SHOW AGREGAR SALIDA
    const [showSalida, setShowSalida] = useState(false);
    const handleCloseSalida = () => setShowSalida(false);
    const handleShowSalida = () => setShowSalida(true);

    const [data, setData] = useState([]);
    const [dataOut, setDataOut] = useState([]);
    const [existenceData, setExistenceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await ObtenerPost(getToken(), 'obtener/entradas/items', { idKardex: 2 });
                if (info.code !== 200) {
                    mensajes(info.msg, 'error');
                    if (info.msg === 'Acceso denegado. Token ha expirado') {
                        borrarSesion();
                        navigate("/login");
                    }
                } else {
                    const newRows = info.info.map(item => createData(
                        obtenerFechaFormateada(item.date),
                        item.batch.code,
                        item.detail,
                        item.quantity,
                        item.existence,
                        obtenerFechaFormateada(item.batch.expiryDate),
                        obtenerFechaFormateada(item.batch.expirationDate)
                    ));
                    setData(newRows);
                }
            } catch (error) {
                mensajes("Error al cargar los datos: " + error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [navigate]);

    useEffect(() => {
        const fetchDataOut = async () => {
            try {
                const info = await ObtenerPost(getToken(), 'obtener/salidas/items', { idKardex: 2 });
                if (info.code !== 200) {
                    mensajes(info.msg, 'error');
                    if (info.msg === 'Acceso denegado. Token ha expirado') {
                        borrarSesion();
                        navigate("/login");
                    }
                } else {
                    const newRows = info.info.map(item => createData(
                        obtenerFechaFormateada(item.date),
                        item.batch.code,
                        item.detail,
                        item.quantity,
                        item.existence,
                        obtenerFechaFormateada(item.batch.expiryDate),
                        obtenerFechaFormateada(item.batch.expirationDate)
                    ));
                    setDataOut(newRows);
                }
            } catch (error) {
                mensajes("Error al cargar los datos: " + error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchDataOut();

    }, [navigate]);

    useEffect(() => {
        const fetchDataExistence = async () => {
            try {
                const info = await ObtenerGet(getToken(), 'obtener/existencia');
                if (info.code !== 200) {
                    if (info.msg === 'Acceso denegado. Token ha expirado') {
                        mensajes(info.msg, 'error');
                        borrarSesion();
                        navigate("/login");
                    } else {
                        mensajes(info.msg, 'error');
                    }
                } else {
                    setExistenceData(info.info);
                }
            } catch (error) {
                mensajes("Error al cargar los datos: " + error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchDataExistence();
    }, [navigate]);

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="Ordenes">
            <div className="SideBarContainer">
                <SideBar />
            </div>

            <div className="MainContent">
                <h1>Movimientos del Inventario</h1>
                <div className="MainContent" style={{ position: 'relative' }}> {/* Asegúrate de que este contenedor tiene posición relativa */}
                    {/* Contenido existente... */}
                    <div className="stock">
                        <h2>STOCK</h2>
                        <span>{existenceData.existence}</span>
                    </div>
                    {/* Tablas y otros elementos... */}
                </div>

                <div className="TableData1">
                    <div className="TableContainer">
                        <div className="boton">
                            <Button variant="contained" color="success" className="addButton" onClick={handleShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-plus-fill" viewBox="0 0 16 16">
                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm4.5 6V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5a.5.5 0 0 1 1 0" />
                                </svg>
                                <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>Registrar Entrada</span>
                            </Button>
                        </div>
                        <h3>Tabla de Entradas</h3>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 400 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                            <TableRow key={index} >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                    <div className="TableContainer">
                        <div className="boton">
                            <Button variant="contained" color="success" className="addButton" onClick={handleShowSalida}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-minus-fill" viewBox="0 0 16 16">
                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1" />
                                </svg>
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>Registrar salida</span>
                            </Button>
                        </div>
                        <h3>Tabla de Salidas</h3>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 400 }}>
                                <MuiTable stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataOut
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow key={index} >
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                >
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </MuiTable>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={dataOut.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>

                    {/* < VENTANA MODAL AGREGAR ENTRADA> */}
                    <div className="model_box">
                        <Modal
                            show={show}
                            onHide={handleCloseSalida}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header style={{ background: 'var(--green)' }}>
                                <Modal.Title style={{ fontWeight: 'bold', color: 'var(--white)' }}> Registrar entrada
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AgregarEntrada />

                            </Modal.Body>

                            <Modal.Footer style={{ background: 'var(--green)' }}>
                                <Button variant="secondary" onClick={() => { handleClose(); }} style={{ fontWeight: 'bold', color: 'var(--white)' }}>
                                    Cerrar
                                </Button>

                            </Modal.Footer>
                        </Modal>
                    </div>

                    {/* < VENTANA MODAL INGRESAR SALIDA> */}
                    <div className="model_box">
                        <Modal
                            show={showSalida}
                            onHide={handleCloseSalida}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header style={{ background: 'var(--green)' }}>
                                <Modal.Title style={{ fontWeight: 'bold', color: 'var(--white)' }}> Registrar Salida
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AgregarSalida />

                            </Modal.Body>

                            <Modal.Footer style={{ background: 'var(--green)' }}>
                                <Button variant="secondary" onClick={() => { handleCloseSalida(); }} style={{ fontWeight: 'bold', color: 'var(--white)' }}>
                                    Cerrar
                                </Button>

                            </Modal.Footer>
                        </Modal>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Ordenes;
