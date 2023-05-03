import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalFormTask from './ModalFormTask';

const Iteration = () => {
  const { iditeration } = useParams();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>Iteracion {iditeration}</h3>
        </header>
      </div>
      <button onClick={handleShowModal} type="button" className="btn btn-primary">
        Agregar Tarea
      </button>
      <div style={{margin: 50}}></div>
      <ModalFormTask show={showModal} handleClose={handleCloseModal} iditeration={iditeration}/>
    </>
  )
}

export default Iteration;