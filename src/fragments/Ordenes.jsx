import React, { useState } from 'react';
import '../css/TableData.css';
import '../css/TablaOrdenes.css';
import '../css/global.css';
import Paper from '@mui/material/Paper';
import { default as MuiTable } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SideBar from "./Sidebar";
import Button from '@mui/material/Button';



const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'code', label: 'Código', minWidth: 100 },
    {
        id: 'population',
        label: 'Stock',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Fecha de caducidad',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Lote',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size, status) {
    const density = population / size;
    return { name, code, population, size, density, status };
}

const rows = [
    createData('Producto 1', 'IN', 1324171354, 3287263, 'Active'),
    createData('Producto 2', 'CN', 1403500365, 9596961, 'Inactive'),
    createData('Producto 3', 'IT', 60483973, 301340, 'Active'),
    createData('Producto 4', 'US', 327167434, 9833520, 'Inactive'),
    createData('Producto 5', 'CA', 37602103, 9984670, 'Active'),
    createData('Producto 6', 'AU', 25475400, 7692024, 'Active'),
    createData('Producto 7', 'DE', 83019200, 357578, 'Inactive'),
    createData('Producto 8', 'IE', 4857000, 70273, 'Active'),
    createData('Producto 9', 'MX', 126577691, 1972550, 'Active'),
    createData('Producto 10', 'JP', 126317000, 377973, 'Inactive'),
    createData('Producto 11', 'FR', 67022000, 640679, 'Active'),
    createData('Producto 12', 'GB', 67545757, 242495, 'Inactive'),
    createData('Producto 13', 'RU', 146793744, 17098246, 'Active'),
    createData('Producto 14', 'NG', 200962417, 923768, 'Inactive'),
    createData('Producto 15', 'BR', 210147125, 8515767, 'Active'),
];

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

    return (
        <div className="Ordenes">
            <div className="SideBarContainer">
                <SideBar />
            </div>

            <div className="MainContent">
                <h1>Movimientos del Inventario</h1>
                <div className="TableData1">
                    <div className="TableContainer">
                        <div className="boton">
                            <Button variant="contained" color="success" className="addButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5" />
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                </svg>
                                <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>Agregar Producto</span>
                            </Button>
                        </div>
                        <h3>Tabla de Entradas</h3>
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
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                    <div className="TableContainer">
                        <div className="boton">
                            <Button variant="contained" color="success" className="addButton">
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
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ordenes;
