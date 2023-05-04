import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModalFormTask from './ModalFormTask';
import UserService from "../../services/user.service";

const Iteration = () => {
  const { iditeration } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false)

  useEffect(() => {
    UserService.getIteration(iditeration).then(
      (response) => {
        setContent(response.data);
        setLoading(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  if(loading){
    return <div>Cargando...</div>
  }

  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>Iteracion {content.iteration_number}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Estado: {content.state}</li>
          <li type="disc">Objetivo: {content.goal}</li>
          <li type="disc">Cantidad de tareas asociadas: {content.task_qty}</li>
          <li type="disc">Cantidad de usuarios tester de la iteracion: {content.users_qty}</li>
        </ul>
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