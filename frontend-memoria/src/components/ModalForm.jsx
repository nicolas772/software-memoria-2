import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ModalForm(props) {
  const {show, handleClose} = props;
  const [formValues, setFormValues] = useState({
    // Define aquí los valores iniciales del formulario
    nombre: "",
    email: "",
    mensaje: "",
  });

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se puede realizar la lógica para enviar los datos del formulario
    console.log(formValues);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre completo"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Dirección de correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa tu mensaje"
                name="mensaje"
                value={formValues.mensaje}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalForm;
