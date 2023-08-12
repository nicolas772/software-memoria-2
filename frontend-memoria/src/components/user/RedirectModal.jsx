import { Modal, Button } from 'react-bootstrap';

const RedirectModal = ({ show, handleClose, handleRedirect, body, title }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleRedirect}>
          Ir a Estudio
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RedirectModal;