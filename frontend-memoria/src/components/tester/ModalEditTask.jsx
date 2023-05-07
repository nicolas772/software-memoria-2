import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import TaskService from "../../services/task.service";

function TimeInput(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type="number"
        min="0"
        max={props.max}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

function ModalEditTask(props) {
  const { show, handleClose, idtask, content } = props;
  const [titulo, setTitulo] = useState(content.title);
  const [descripcion, setDescripcion] = useState(content.description);
  const [dificulty, setDificulty] = useState(content.dificulty);
  const [minutes, setMinutes] = useState(content.minutes_optimal);
  const [seconds, setSeconds] = useState(content.seconds_optimal);

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const onChangeTitulo = (e) => {
    const titulo = e.target.value;
    setTitulo(titulo);
  };
  const onChangeDescripcion = (e) => {
    const descripcion = e.target.value;
    setDescripcion(descripcion);
  };
  const onChangeDificulty = (e) => {
    const dificulty = e.target.value;
    setDificulty(dificulty);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede realizar la lógica para enviar los datos del formulario
    TaskService.update(idtask, titulo, descripcion, dificulty, minutes, seconds).then(
      (response) => {
        setTitulo("")
        setDescripcion("")
        setDificulty("Fácil")
        setMinutes(0)
        setSeconds(0)
        handleClose();
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitulo">
              <Form.Label>Título de la tarea.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa un título para la nueva tarea."
                name="titulo"
                value={titulo}
                onChange={onChangeTitulo}
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción de la tarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Describe la tarea a realizar por el usuario."
                name="descripcion"
                value={descripcion}
                onChange={onChangeDescripcion}
              />
            </Form.Group>

            <div className="form-group">
              <label htmlFor="inputSoftwareType">Dificultad de la tarea</label>
              <select onChange={onChangeDificulty} value={dificulty} id="inputDificulty" className="form-control">
                <option>Fácil</option>
                <option>Medio</option>
                <option>Difícil</option>
              </select>
            </div>
            <label htmlFor="inputDuracion">Duración óptima de la tarea</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TimeInput
                label="Minutes"
                max="59"
                value={minutes}
                onChange={handleMinutesChange}
              />
              <span style={{ alignSelf: "flex-end", margin: "0 12px" }}>:</span>
              <TimeInput
                label="Seconds"
                max="59"
                value={seconds}
                onChange={handleSecondsChange}
              />
            </div>
            <div style={{ margin: 20 }}></div>
            <Button variant="primary" type="submit">
              Editar Tarea
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditTask;
