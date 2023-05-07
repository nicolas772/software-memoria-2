import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import UserService from "../../services/user.service";
import { Link } from "react-router-dom";

const TableTasks = (props) => {
  const { iditeration } = props;
  const [content, setContent] = useState([]);

  useEffect(() => {
    UserService.getTasks(iditeration).then(
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
          <th>ID Tarea</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Dificultad</th>
          <th>Tiempo óptimo [min:seg]</th>
        </tr>
      </thead>
      <tbody>
        {content.map((fila, index) => (
          <tr key={fila.id}>
            <td>{fila.id}</td>
            <td>{fila.title}</td>
            <td>{fila.description}</td>
            <td>{fila.dificulty}</td>
            <td>{fila.minutes_optimal}:{fila.seconds_optimal}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableTasks