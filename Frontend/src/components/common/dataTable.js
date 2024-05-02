import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const DataTable = ({ column, row }) => {
    const [rows, setRows] = useState(row);

    useEffect(() => { setRows(row) }, [row])

    return (
        <div style={{ width: '100%', height: "69vh" }}>
            <DataGrid
                rows={rows}
                columns={column}
                pageSize={25}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
        </div>
    );
};

export default DataTable;
