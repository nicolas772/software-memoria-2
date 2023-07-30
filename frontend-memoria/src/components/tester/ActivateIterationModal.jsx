import { Modal, Button } from 'react-bootstrap';

const ActivateIterationModal = ({ show, handleClose, handleActivate, element, ntareas }) => {
  if (ntareas === 0) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>No es posible activar la {element}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Agrega una tarea para poder activar la {element}.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" disabled>
            Activar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>¿Está seguro que desea activar la {element}?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleActivate}>
          Activar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActivateIterationModal;