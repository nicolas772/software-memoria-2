import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';

export default function TableDashGeneralStudy(props) {
   const {content} = props
   const [orderBy, setOrderBy] = useState('name');
   const [order, setOrder] = useState('asc');
   console.log(content)
   const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const sortedRows = content.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (order === 'asc') {
         return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
      } else {
         return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
      }
   });
   return (
      <TableContainer component={Paper} style={{ maxHeight: 396, overflowY: 'auto' }}>
         <Table stickyHeader sx={{ minWidth: 500, minHeight: 200 }} aria-label="sortable table">
            <TableHead>
               <TableRow>
                  <TableCell>
                     <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleRequestSort('name')}
                     >
                        <strong>Iteración</strong>
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                     <TableSortLabel
                        active={orderBy === 'minTiempo'}
                        direction={orderBy === 'minTiempo' ? order : 'asc'}
                        onClick={() => handleRequestSort('minTiempo')}
                     >
                        <strong>Min Tiempo</strong>
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                     <TableSortLabel
                        active={orderBy === 'maxTiempo'}
                        direction={orderBy === 'maxTiempo' ? order : 'asc'}
                        onClick={() => handleRequestSort('maxTiempo')}
                     >
                        <strong>Max Tiempo</strong>
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                     <TableSortLabel
                        active={orderBy === 'diferencia'}
                        direction={orderBy === 'diferencia' ? order : 'asc'}
                        onClick={() => handleRequestSort('diferencia')}
                     >
                        <strong>Diferencia</strong>
                     </TableSortLabel>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {sortedRows.map((row) => (
                  <TableRow
                     key={row.name}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {row.name}
                     </TableCell>
                     <TableCell align="center">{row.minTiempo}</TableCell>
                     <TableCell align="center">{row.maxTiempo}</TableCell>
                     <TableCell align="center">{row.diferencia}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
