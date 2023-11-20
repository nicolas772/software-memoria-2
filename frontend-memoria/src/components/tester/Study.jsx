import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserService from "../../services/user.service";
import StudyService from "../../services/study.service";
import ModalFormIteration from "./ModalFormIteration";
import TableIterations from "./TableIterations";
import ModalEditStudy from "./ModalEditStudy";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { Button } from 'react-bootstrap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from "./CustomTabPanel";
import DashboardGeneralStudy from "./Dashboards/DashboardGeneralStudy"
import DashboardSentimentStudy from "./Dashboards/DashboardSentimentStudy"
import DashboardDemogrStudy from "./Dashboards/DashboardDemogrStudy";

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

  const handleBack = () => {
    window.history.back();
  }

  useEffect(() => {
    setTitle('Estudio ' + content.software_name)
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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <div style={{ padding: 20, paddingBottom:5, position: 'sticky', top: 0, zIndex: 1000, background: 'white' }}>
        <div className="header-pages">
          <header>
            <h3>{content.software_name}</h3>
            <p>
              Total Iteraciones: <strong>{contentTable.length}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
              Tipo de Software: <strong>{content.software_tipe}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
              Sitio Web: <a href={content.url} target="_blank"><strong>{content.software_name}</strong></a>
            </p>
          </header>
        </div>
        <div style={{ display: 'flex' , marginBottom: '2%', marginTop: '2%'}}>
          <button onClick={handleBack} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
            Volver a Estudios
          </button>
          <button onClick={handleShowModal} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
            Nueva Iteración
          </button>
          <button onClick={handleShowEditModal} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
            Editar Estudio
          </button>

          <Button variant="danger" onClick={handleShowDeleteModal}>
            Eliminar Estudio
          </Button>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="General" />
            <Tab label="Demográfico" />
            <Tab label="Sentimiento y Opiniones" />
            <Tab label="Iteraciones" />
          </Tabs>
        </Box>
      </div>
      <CustomTabPanel value={value} index={0}>
        <DashboardGeneralStudy idStudy={idstudy}></DashboardGeneralStudy>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <DashboardDemogrStudy></DashboardDemogrStudy>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DashboardSentimentStudy></DashboardSentimentStudy>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TableIterations content={contentTable}></TableIterations>
      </CustomTabPanel>

      <ModalFormIteration
        show={showModal}
        handleClose={handleCloseModal}
        idstudy={idstudy} />
      <ModalEditStudy
        show={showEditModal}
        handleClose={handleCloseEditModal}
        onEditSuccess={handleEditSuccess}
        idstudy={idstudy}
        content={content} />
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        element={title}
      />
    </div>
  )
}

export default Study