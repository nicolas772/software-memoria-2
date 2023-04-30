import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

const fechaConPalabras = (miFecha) => {
  const fecha = new Date(miFecha);
  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaConPalabras = fecha.toLocaleDateString('es-ES', opcionesFecha);
  return(fechaConPalabras); 
}

const TableStudies = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getStudies().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  if (content.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre del Software</th>
          <th>Tipo de Software</th>
          <th>URL</th>
          <th>Fecha Inicio Estudio</th>
          <th>Fecha Término Estudio</th>
          <th>Iteraciones</th>
        </tr>
      </thead>
      <tbody>
        {content.map((fila, index) => (
          <tr key={index}>
            <td>
              <Link to={fila.id.toString()}>{fila.software_name}</Link>
            </td>
            <td>{fila.software_tipe}</td>
            <td>{fila.url}</td>
            <td>{fechaConPalabras(fila.start_date)}</td>
            <td>{fechaConPalabras(fila.end_date)}</td>
            <td>{fila.iteration_qty}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableStudies