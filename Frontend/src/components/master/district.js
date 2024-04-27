import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const District = () => {
    const columns = [
        { field: 'id', headerName: 'S. No.', width: 100, renderCell: (params) => params.row.id },
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        { field: 'age', headerName: 'Age', type: 'number', width: 110 },
        { field: 'email', headerName: 'Email', width: 200 },
    ];

    const initialRows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: 'jon.snow@example.com' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: 'cersei.lannister@example.com' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: 'jaime.lannister@example.com' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: 'arya.stark@example.com' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, email: 'daenerys.targaryen@example.com' },
        { id: 6, lastName: 'Melisand', firstName: null, age: 150, email: 'melisandre@example.com' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: 'ferrara.clifford@example.com' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: 'rossini.frances@example.com' },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: 'harvey.roxie@example.com' },
    ];

    const [rows, setRows] = useState(initialRows);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        const filteredRows = initialRows.filter(row => row.firstName?.toLowerCase().includes(value?.toLowerCase()));
        setRows(filteredRows);
    };

    return (
        <div style={{ width: '100%' }}>
            <input type="text" placeholder="Search by name..." value={searchTerm} onChange={handleSearch} />
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
    );
};

export default District;
