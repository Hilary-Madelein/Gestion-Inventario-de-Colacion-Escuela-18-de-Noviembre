import React from "react";
import '../css/TableData.css';
import Paper from '@mui/material/Paper';
import { default as MuiTable } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'left',
    },
];

function createData(name, code, population, size, status) {
    const density = population / size;
    return { name, code, population, size, density, status };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263, 'Active'),
    createData('China', 'CN', 1403500365, 9596961, 'Inactive'),
    createData('Italy', 'IT', 60483973, 301340, 'Active'),
    createData('United States', 'US', 327167434, 9833520, 'Inactive'),
    createData('Canada', 'CA', 37602103, 9984670, 'Active'),
    createData('Australia', 'AU', 25475400, 7692024, 'Active'),
    createData('Germany', 'DE', 83019200, 357578, 'Inactive'),
    createData('Ireland', 'IE', 4857000, 70273, 'Active'),
    createData('Mexico', 'MX', 126577691, 1972550, 'Active'),
    createData('Japan', 'JP', 126317000, 377973, 'Inactive'),
    createData('France', 'FR', 67022000, 640679, 'Active'),
    createData('United Kingdom', 'GB', 67545757, 242495, 'Inactive'),
    createData('Russia', 'RU', 146793744, 17098246, 'Active'),
    createData('Nigeria', 'NG', 200962417, 923768, 'Inactive'),
    createData('Brazil', 'BR', 210147125, 8515767, 'Active'),
];

const TableData = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active':
                return { backgroundColor: '#d4edda', color: '#155724', padding: '0.3rem 0.5rem', borderRadius: '0.25rem' };
            case 'Inactive':
                return { backgroundColor: '#f8d7da', color: '#721c24', padding: '0.3rem 0.5rem', borderRadius: '0.25rem' };
            default:
                return {};
        }
    };

    return (
        <div className="TableData">
            <h3>Recent Orders</h3>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
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
                                                        style={column.id === 'status' ? getStatusStyle(value) : {}}
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
    );
}

export default TableData;
