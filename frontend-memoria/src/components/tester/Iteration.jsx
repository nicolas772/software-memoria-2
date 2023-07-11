import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModalFormTask from './ModalFormTask';
import UserService from "../../services/user.service";
import IterationService from '../../services/iteration.service';
import TableTasks from './TableTasks';
import ModalEditIteration from './ModalEditIteration';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import ActivateIterationModal from './ActivateIterationModal';
import FinalizarIterationModal from './FinalizarIterationModal';
import Navbar from "../Navbar";

function agregarCeros(numero) {
  const longitudDeseada = 6;
  const numeroString = String(numero);

  if (numeroString.length >= longitudDeseada) {
    return numeroString;
  } else {
    const cerosFaltantes = longitudDeseada - numeroString.length;
    const ceros = '0'.repeat(cerosFaltantes);
    return ceros + numeroString;
  }
}

const Iteration = () => {
  const { iditeration } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showActivateModal, setShowActivateModal] = useState(false)
  const [showFinalizarModal, setShowFinalizarModal] = useState(false)
  const [title, setTitle] = useState("")
  const navigate = useNavigate()

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false)

  const handleShowEditModal = () => setShowEditModal(true)
  const handleCloseEditModal = () => setShowEditModal(false)

  const handleShowDeleteModal = () => setShowDeleteModal(true)
  const handleCloseDeleteModal = () => setShowDeleteModal(false)

  const handleShowActivateModal = () => setShowActivateModal(true)
  const handleCloseActivateModal = () => setShowActivateModal(false)

  const handleShowFinalizarModal = () => setShowFinalizarModal(true)
  const handleCloseFinalizarModal = () => setShowFinalizarModal(false)

  const handleActivate = () => {
    const state = "Activa"
    IterationService.setStateIteration(iditeration, state).then(
      (response) => {
        setShowActivateModal(false);
        window.location.reload()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const handleFinalizar = () => {
    const state = "Finalizada"
    IterationService.setStateIteration(iditeration, state).then(
      (response) => {
        setShowActivateModal(false);
        window.location.reload()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const handleDelete = () => {
    // Lógica para eliminar el elemento
    IterationService.deleteIteration(iditeration, content.studyId).then(
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

  useEffect(() => {
    setTitle('Iteración ' + content.iteration_number)
  }, [content])

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
      <Navbar></Navbar>
      <div className="container">
        <header className="jumbotron">
          <h3>Iteracion {content.iteration_number}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Estado: {content.state}</li>
          <li type="disc">Codigo iteracion: {agregarCeros(iditeration)}</li>
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
        {content.state === 'Activa' ? (
          <button onClick={handleShowFinalizarModal} type="button" className="btn btn-danger" style={{ marginRight: '10px' }}>
            Finalizar Iteración
          </button>
        ) : (
          <button onClick={handleShowActivateModal} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>
            Activar Iteración
          </button>
        )}
        <button onClick={handleShowDeleteModal} type="button" className="btn btn-danger">
          Eliminar Iteración
        </button>
      </div>
      <div style={{ margin: 50 }}></div>
      <ModalFormTask show={showModal} handleClose={handleCloseModal} iditeration={iditeration} />
      <ModalEditIteration show={showEditModal} handleClose={handleCloseEditModal} iditeration={iditeration} content={content} />
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        element={title}
      />
      <ActivateIterationModal
        show={showActivateModal}
        handleClose={handleCloseActivateModal}
        handleActivate={handleActivate}
        element={title}
        ntareas={content.task_qty}
      />
      <FinalizarIterationModal
        show={showFinalizarModal}
        handleClose={handleCloseFinalizarModal}
        handleFinalizar={handleFinalizar}
        element={title}
      />
    </>
  )
}

export default Iteration;