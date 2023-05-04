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

function ModalFormTask(props) {
  const { show, handleClose, iditeration } = props;
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dificulty, setDificulty] = useState("Fácil");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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
    TaskService.create(iditeration, titulo, descripcion, dificulty, minutes, seconds).then(
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
          <Modal.Title>Nueva Tarea</Modal.Title>
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
              Crear Tarea
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalFormTask;
