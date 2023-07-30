import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from "../../services/user.service";
import TaskService from '../../services/task.service';
import ModalEditTask from './ModalEditTask';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const Task = () => {
  const { idtask } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reloadTask, setReloadTask] = useState(false)
  const navigate = useNavigate()

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false)
    setReloadTask(!reloadTask)
  }

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    // Lógica para eliminar el elemento
    TaskService.deleteTask(idtask, content.iterationId).then(
      (response) => {
        setShowDeleteModal(false);
        //window.history.back();
        navigate(-1) //hace lo mismo que la linea de arriba
      },
      (error) => {
        console.log(error)
      }
    )
  };

  const handleBack = () => {
    window.history.back();
  }


  useEffect(() => {
    UserService.getTask(idtask).then(
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
  }, [reloadTask]);

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <>
      <div>
        <header>
          <h3>{content.title}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Descripción: {content.description}</li>
          <li type="disc">Dificultad: {content.dificulty}</li>
          <li type="disc">Tiempo optimo: {content.minutes_optimal} minutos y {content.seconds_optimal} segundos</li>
        </ul>
      </div>

      <div style={{ display: 'flex' }}>
        <button onClick={handleShowModal} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>
          Editar Tarea
        </button>
        <button onClick={handleShowDeleteModal} type="button" className="btn btn-danger" style={{ marginRight: '10px' }}>
          Eliminar Tarea
        </button>
        <button onClick={handleBack} type="button" className="btn btn-primary">
          Volver a Iteración
        </button>
      </div>
      <div style={{ margin: 50 }}></div>
      <ModalEditTask 
        show={showModal} 
        handleClose={handleCloseModal} 
        idtask={idtask} 
        content={content}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        element={content.title}
      />
    </>
  )
}

export default Task;