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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
    <div style={{ margin: '20px' }}>
      <div className="header-pages">
        <header>
          <h3>{content.software_name}</h3>
          <p>
            Total Iteraciones: <strong>{contentTable.length}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
            Tipo de Software: <strong>{content.software_tipe}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
            Sitio Web: <a href={content.url} target="_blank"><strong>{content.url}</strong></a>
          </p>
        </header>
      </div>
      <div style={{ display: 'flex' }}>
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
      <div style={{ margin: '2%' }}></div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Dashboard"
              {...a11yProps(0)}/>
            <Tab label="Iteraciones" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Dashboard
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TableIterations content={contentTable}></TableIterations>
        </CustomTabPanel>
      </Box>
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