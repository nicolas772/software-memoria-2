import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ModalChangePassword(props) {
  const { show, handleClose, userId } = props;
  const [softwareName, setSoftwareName] = useState("");
  const [softwareType, setSoftwareType] = useState("App Desktop");
  const [softwareUrl, setSoftwareUrl] = useState("");

  const onChangeSoftwareName = (e) => {
    const softwareName = e.target.value;
    setSoftwareName(softwareName);
  };
  const onChangeSoftwareType = (e) => {
    const softwareType = e.target.value;
    setSoftwareType(softwareType);
  };
  const onChangeSoftwareUrl = (e) => {
    const softwareUrl = e.target.value;
    setSoftwareUrl(softwareUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userId)
    console.log("Enviar")
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSoftwareName">
              <Form.Label>Contraseña Actual</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa Contraseña Actual"
                name="softwareName"
                value={softwareName}
                onChange={onChangeSoftwareName}
              />
            </Form.Group>

            <Form.Group controlId="formSoftwareName">
              <Form.Label>Contraseña Nueva</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa Contraseña Nueva"
                name="softwareName"
                value={softwareName}
                onChange={onChangeSoftwareName}
              />
            </Form.Group>


            <Form.Group controlId="formUrl">
              <Form.Label>Contraseña Nueva</Form.Label>
              <Form.Control
                type="text"
                placeholder="Confirme Contraseña"
                name="Url"
                value={softwareUrl}
                onChange={onChangeSoftwareUrl}
              />
            </Form.Group>
            <Button variant="secondary">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Cambiar Contraseña
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalChangePassword;
