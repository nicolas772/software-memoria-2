import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const FinalizarIterationModal = ({ show, handleClose, handleFinalizar, element }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>¿Está seguro que desea finalizar {element}?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleFinalizar}>
          Finalizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinalizarIterationModal;