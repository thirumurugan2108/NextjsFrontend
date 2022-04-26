import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function DataTable({rows, statusChange}) {
  const columns = [
    { field: 'sl', headerName: 'SL', width: 70, sortable: false },
    { field: 'title', headerName: 'Card Title', width: 180 },
    { field: 'buyerName', headerName: 'Name', width: 180, sortable: true, },
    { field: 'buyerEmailId', headerName: 'Email', width: 220, sortable: true, },
    { field: 'buyerPhoneNumber', headerName: 'Mobile', width: 180, sortable: true, },
    { field: 'createdAt', headerName: 'Date', width: 100, sortable: true, },
    { field: 'price', headerName: 'Price', width: 100, sortable: true, },
    {field: 'comments', headerName: 'Comments', width: 250, sortable: true},
    { field: 'status', headerName: 'Status', width: 130, sortable: true, 
    renderCell :(params) => {
      return( <select onChange={statusChange} id={`status-${params.id}`}>
      <option value="pending" selected = {params.value == "pending" ? "selected" : ''}>Pending</option>
      <option value="success" selected = {params.value == "success" ? "selected" : ''}>Success</option>
      </select>)
    }}
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}