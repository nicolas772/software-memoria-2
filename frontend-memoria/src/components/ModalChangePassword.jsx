import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ModalChangePassword(props) {
  const { show, handleClose, userId } = props;
  const [actualPass, setActualPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const onChangeActualPass = (e) => {
    const actualPass = e.target.value;
    setActualPass(actualPass);
  };
  const onChangeNewPass = (e) => {
    const newPass = e.target.value;
    setNewPass(newPass);
  };
  const onChangeConfirmPass = (e) => {
    const confirmPass = e.target.value;
    setConfirmPass(confirmPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userId)
    console.log("Enviar")
    handleClose();
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="actualPassForm">
              <Form.Label>Contraseña Actual</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa Contraseña Actual"
                value={actualPass}
                onChange={onChangeActualPass}
                className="pass-input"
              />
            </Form.Group>

            <Form.Group controlId="newPassForm">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa Contraseña Nueva"
                value={newPass}
                onChange={onChangeNewPass}
                className="pass-input"
              />
            </Form.Group>

            <Form.Group controlId="confirmPassForm">
              <Form.Control
                type="password"
                placeholder="Confirme Contraseña"
                value={confirmPass}
                onChange={onChangeConfirmPass}
                className="pass-input"
              />
            </Form.Group>
            <div className="buttons-div">
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Cambiar Contraseña
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalChangePassword;
