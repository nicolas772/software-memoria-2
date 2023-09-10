import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import UserService from "../services/user.service"

const validLength = (value, isUsername) => {
  if (value.length < 6 || value.length > 20) {
    if (isUsername) {
      return ("El nombre de usuario debe tener entre 6 y 20 caracteres.");
    } else {
      return ("La nueva contraseña debe tener entre 6 y 20 caracteres.");
    }
  }
};

function ModalChangePassword(props) {
  const { show, handleClose, userId } = props;
  const [actualPass, setActualPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPassError, setNewPassError] = useState("")

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

  const validNewPassword = () => {
    const lengthError = validLength(newPass, false);
    if (lengthError) {
      setNewPassError(lengthError);
      return false;
    } else {
      if (newPass !== confirmPass) {
        setNewPassError("La contraseña de verificación no coincide.");
        return false;
      } else {
        return true;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validNewPassword(); // Cambia el nombre de la variable
    if (isValid) { // Usa la variable en lugar de la función
      UserService.updatePassword(userId, actualPass, newPass).then(
        (response) => {
          console.log(response)
          handleClose()
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setNewPassError(resMessage)
        }
      )
    }
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
            {newPassError && (
              <div className="alert alert-danger" role="alert">
                {newPassError}
              </div>
            )}
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
