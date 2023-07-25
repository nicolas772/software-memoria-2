import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

const fechaConPalabras = (miFecha) => {
  const fecha = new Date(miFecha);
  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaConPalabras = fecha.toLocaleDateString('es-ES', opcionesFecha);
  return(fechaConPalabras); 
}

const TableIterations = (props) => {
  const { content } = props;

  if (content.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Iteración</th>
          <th>Estado</th>
          <th>Fecha Inicio Iteración</th>
          <th>Fecha Término Iteración</th>
          <th>Cantidad de Tareas</th>
          <th>Cantidad de Usuarios Activos</th>
          <th>Cantidad de Usuarios Finalizados</th>
          <th>Objetivo</th>
        </tr>
      </thead>
      <tbody>
        {content.map((fila, index) => (
          <tr key={fila.id}>
            <td>
              <Link to={fila.id.toString()}>Iteración {fila.iteration_number}</Link>
            </td>
            <td>{fila.state}</td>
            <td>{fechaConPalabras(fila.start_date)}</td>
            <td>{fechaConPalabras(fila.end_date)}</td>
            <td>{fila.task_qty}</td>
            <td>{fila.users_qty}</td>
            <td>{fila.users_qty_complete}</td>
            <td>{fila.goal}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableIterations