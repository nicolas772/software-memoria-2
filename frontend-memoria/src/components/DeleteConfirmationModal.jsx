import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, handleClose, handleDelete, element }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <p
        style={{color: '#344b60', fontFamily: "Poppins, sans-serif", fontSize:'16px'}}
        >¿Estás seguro que deseas eliminar los siguiente: <strong>{element}</strong>?</p> 
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;