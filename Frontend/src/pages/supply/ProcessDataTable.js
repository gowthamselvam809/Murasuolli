import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const ProcessDataTable = ({ column, row }) => {
    const [rows, setRows] = useState(row);

    useEffect(() => { setRows(row) }, [row]);

    // Custom CSS for pinned columns
    const getColumnClassName = (field) => {
        if (field === 'id' || field === 'Agent') {
            return 'pinned-column';
        }
        return '';
    };

    // Add class name to columns
    const columnsWithClasses = column.map(col => ({
        ...col,
        cellClassName: getColumnClassName(col.field),
        headerClassName: getColumnClassName(col.field),
        // Ensure the width is fixed for pinned columns
    }));

    return (
        <div style={{ width: '100%', height: "69vh" }}>
            <DataGrid
                rows={rows}
                columns={columnsWithClasses}
                pageSize={25}
                pagination="auto"
                style={{ width: '100%', position: 'relative' }}
                slots={{ toolbar: GridToolbar }}
                rowsPerPageOptions={[500, 1000, 2000]}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                sx={{
                    '& .pinned-column': {
                        position: 'sticky !important',
                        left: '0px !important',
                        zIndex: '999 !important',
                        background: 'white !important',
                        boxShadow: '2px 0px 5px -2px rgba(0,0,0,0.3) !important',
                    },

                }}
            />
        </div>
    );
};

export default ProcessDataTable;
