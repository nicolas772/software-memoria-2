import { Modal, Button } from 'react-bootstrap';

const RedirectModal = ({ show, handleClose, handleRedirect, body }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Información</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleRedirect}>
          Ir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RedirectModal;