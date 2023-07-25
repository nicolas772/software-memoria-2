import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import UserService from "../../services/user.service";
import StudyService from "../../services/study.service";
import ModalFormIteration from "./ModalFormIteration";
import TableIterations from "./TableIterations";
import ModalEditStudy from "./ModalEditStudy";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const Study = () => {
  const { idstudy } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [title, setTitle] = useState("")
  const [reloadStudy, setReloadStudy] = useState(false); // Variable para forzar la recarga del componente
  const navigate = useNavigate()

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false)
    setReloadStudy(!reloadStudy)
  }

  const handleShowEditModal = () => setShowEditModal(true)
  const handleCloseEditModal = () => setShowEditModal(false)
  
  const handleShowDeleteModal = () => setShowDeleteModal(true)
  const handleCloseDeleteModal = () => setShowDeleteModal(false)

  const handleDelete = () => {
    // Lógica para eliminar el elemento
    StudyService.deleteStudy(idstudy).then(
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
    setTitle('Estudio de ' + content.software_name)
  }, [content])

  useEffect(() => {
    UserService.getStudy(idstudy).then(
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
  }, [idstudy]);

  // Función para manejar la edición exitosa
  const handleEditSuccess = (editedContent) => {
    setContent(editedContent);
    handleCloseEditModal();
  };

  const [contentTable, setContentTable] = useState([]);

  useEffect(() => {
    UserService.getIterations(idstudy).then(
      (response) => {
        setContentTable(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContentTable(_content);
      }
    );
  }, [reloadStudy]);

  if(loading){
    return <div>Cargando...</div>
  }

  return (
    <>
      <div>
        <header>
          <h3>Estudio {content.software_name}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Nombre: {content.software_name}</li>
          <li type="disc">Tipo de software: {content.software_tipe}</li>
          <li type="disc">URL: {content.url}</li>
        </ul>
      </div>
      <TableIterations content={contentTable}></TableIterations>
      <div style={{ display: 'flex' }}>
        <button onClick={handleShowModal} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>
          Nueva Iteración
        </button>
        <button onClick={handleShowEditModal} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>
          Editar Estudio
        </button>
        <button onClick={handleShowDeleteModal} type="button" className="btn btn-danger">
          Eliminar Estudio
        </button>
      </div>
      <div style={{ margin: 50 }}></div>
      <ModalFormIteration show={showModal} handleClose={handleCloseModal} idstudy={idstudy}/>
      <ModalEditStudy show={showEditModal} handleClose={handleCloseEditModal} onEditSuccess={handleEditSuccess} idstudy={idstudy} content={content} />
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        element={title}
      />
    </>
  )
}

export default Study