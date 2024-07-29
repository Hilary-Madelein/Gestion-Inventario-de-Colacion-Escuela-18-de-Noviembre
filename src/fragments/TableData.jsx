import React, { useState, useEffect } from 'react';
import '../css/TableData.css';
import Paper from '@mui/material/Paper';
import { default as MuiTable } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { ObtenerPost } from '../hooks/Conexion';
import { borrarSesion, getToken } from '../utils/SessionUtil';
import mensajes from '../utils/Mensajes';

const columns = [
    { id: 'nro', label: 'Nro. Lote', minWidth: 200 },
    { id: 'quantity', label: 'Cantidad Disponible', minWidth: 50 },
    { id: 'detail', label: 'Detalle', minWidth: 200 },
    { id: 'expiryDate', label: 'Fecha de elaboración', minWidth: 100, align: 'left' },
    { id: 'expirationDate', label: 'Fecha de expiración', minWidth: 100, align: 'left' },
    { id: 'status', label: 'Estado', minWidth: 100 },
];

function createData(nro, quantity, detail, expiryDate, expirationDate, status) {
    return { nro, quantity, detail, expiryDate, expirationDate, status };
}

const TableData = ({ kardexId }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [loteData, setLoteData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0); // Reiniciar la página a 0 cuando se cambia el número de filas por página
    };

    const obtenerFechaFormateada = (fechaString) => {
        const fecha = new Date(fechaString);
        fecha.setDate(fecha.getDate() + 1); // Ajustar la fecha sumando 1 día
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!kardexId) {
                setLoteData([]);
                setLoading(false);
                return;
            }

            try {
                const info = await ObtenerPost(getToken(), 'obtener/lotes/movimientos', { kardexId });
                if (info.code !== 200) {
                    mensajes(info.msg, 'error');
                    if (info.msg === 'Acceso denegado. Token ha expirado') {
                        borrarSesion();
                        navigate("/login");
                    }
                } else {
                    const newRows = info.info.map(item => createData(
                        item.batch.code,
                        item.batch.availableQuantity,
                        item.detail,
                        obtenerFechaFormateada(item.batch.expiryDate),
                        obtenerFechaFormateada(item.batch.expirationDate),
                        item.batch.status
                    ));
                    setLoteData(newRows);
                }
            } catch (error) {
                mensajes("Error al cargar los datos: " + error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [kardexId, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loteData.length) {
        return <div>Sin datos disponibles</div>;
    }

    const getStatusStyle = (status) => {
        if (status === true) {
            return { backgroundColor: '#d4edda', color: '#155724', padding: '0.3rem 0.5rem', borderRadius: '0.25rem' };
        } else if (status === false) {
            return { backgroundColor: '#EEEEEE', color: '#214151', padding: '0.3rem 0.5rem', borderRadius: '0.25rem' };
        }
        return {};
    };

    const getStatusText = (status) => {
        return status === true ? 'Producto disponible' : 'No disponible';
    };

    return (
        <div className="TableData">
            <h3>Tabla de Lotes</h3>

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
                            {loteData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.nro}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={column.id === 'status' ? getStatusStyle(value) : {}}
                                                    >
                                                        {column.id === 'status' ? getStatusText(value) :
                                                            (column.format && typeof value === 'number' ? column.format(value) : value)}
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
                    count={loteData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default TableData;
