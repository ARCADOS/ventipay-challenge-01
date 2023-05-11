import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import "./simple-table.css"

const SimpleTable = ({ data, handleDelete, loading }) => {
  if (loading) {
    return <CircularProgress />;
  }

  return (
        <TableContainer component={Paper}>
        <Table className='table' size="small">
            <TableHead>
            <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>Last 4</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((item) => (
                <TableRow key={item.id}>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.last4}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(item.id)}>
                    Delete
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

  );
}

export default SimpleTable;
