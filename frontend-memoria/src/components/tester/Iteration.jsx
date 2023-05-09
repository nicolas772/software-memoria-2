import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModalFormTask from './ModalFormTask';
import UserService from "../../services/user.service";
import TableTasks from './TableTasks';
import ModalEditIteration from './ModalEditIteration';

const Iteration = () => {
  const { iditeration } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false)

  const handleShowEditModal = () => setShowEditModal(true)
  const handleCloseEditModal = () => setShowEditModal(false)
  
  const handleShowDeleteModal = () => setShowDeleteModal(true)
  const handleCloseDeleteModal = () => setShowDeleteModal(false)

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

  if (loading) {
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

      <TableTasks iditeration={iditeration}></TableTasks>


      <div style={{ display: 'flex' }}>
        <button onClick={handleShowModal} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>
          Agregar Tarea
        </button>
        <button onClick={handleShowEditModal} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>
          Editar Iteración
        </button>
        <button onClick={handleShowDeleteModal} type="button" className="btn btn-danger">
          Eliminar Iteración
        </button>
      </div>
      <div style={{ margin: 50 }}></div>
      <ModalFormTask show={showModal} handleClose={handleCloseModal} iditeration={iditeration} />
      <ModalEditIteration show={showEditModal} handleClose={handleCloseEditModal} iditeration={iditeration} content={content} />
    </>
  )
}

export default Iteration;