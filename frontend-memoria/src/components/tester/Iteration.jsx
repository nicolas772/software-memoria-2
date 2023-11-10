import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModalFormTask from './ModalFormTask';
import UserService from "../../services/user.service";
import IterationService from '../../services/iteration.service';
import TableTasks from './TableTasks';
import ModalEditIteration from './ModalEditIteration';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import ActivateIterationModal from './ActivateIterationModal';
import FinalizarIterationModal from './FinalizarIterationModal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ClipboardIcon } from '@heroicons/react/solid';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

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
          {children}
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
  const [reloadTask, setReloadTask] = useState(false);
  const [reloadIteration, setReloadIteration] = useState(false);
  const [title, setTitle] = useState("")
  const [contentTable, setContentTable] = useState([]);
  const navigate = useNavigate()
  const [isCopied, setIsCopied] = useState(false); // Estado para controlar si el texto se ha copiado

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(agregarCeros(iditeration))
      .then(() => {
        setIsCopied(true); // Cambia el estado para indicar que se ha copiado el texto
        setTimeout(() => setIsCopied(false), 2000); // Reinicia el estado después de 1.5 segundos
        toast.success('Código copiado al portapapeles.', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error('Error al copiar al portapapeles', error);
      });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false)
    setReloadTask(!reloadTask)
  }

  const handleShowEditModal = () => setShowEditModal(true)
  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setReloadIteration(!reloadIteration)

  }

  const handleShowDeleteModal = () => setShowDeleteModal(true)
  const handleCloseDeleteModal = () => setShowDeleteModal(false)

  const handleShowActivateModal = () => setShowActivateModal(true)
  const handleCloseActivateModal = () => setShowActivateModal(false)

  const handleShowFinalizarModal = () => setShowFinalizarModal(true)
  const handleCloseFinalizarModal = () => setShowFinalizarModal(false)

  const handleActivate = () => {
    const state = "Activa"
    IterationService.setStateIteration(iditeration, content.studyId, state).then(
      (response) => {
        setShowActivateModal(false);
        //window.location.reload()
        setReloadIteration(!reloadIteration)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const handleFinalizar = () => {
    const state = "Finalizada"
    IterationService.setStateIteration(iditeration, content.studyId, state).then(
      (response) => {
        setShowFinalizarModal(false);
        //window.location.reload()
        setReloadIteration(!reloadIteration)
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

  const handleBack = () => {
    window.history.back();
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTitle("Iteración " + content.iteration_number + " de " + content.software_name)
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
  }, [reloadTask, reloadIteration]);

  useEffect(() => {
    UserService.getTasks(iditeration).then(
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
  }, [reloadTask]);

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div style={{ margin: '20px' }}>
      <div className="header-pages">
        <header>
          <h3>{content.software_name}: Iteración {content.iteration_number}</h3>
          <p className='parrafo'>
            Estado:&nbsp;<strong>{content.state}</strong>&nbsp;&nbsp;&nbsp;
            Usuarios que completaron:&nbsp;<strong>{content.users_qty_complete}</strong>&nbsp;&nbsp;&nbsp;
            Código iteración:&nbsp;
            <span
              onClick={handleCopyToClipboard}
              className={`code-container ${isCopied ? 'copied' : ''}`}
            >
              &nbsp;<strong>{agregarCeros(iditeration)}</strong>
              <ClipboardIcon className="copy-icon" />
            </span>
          </p>
          <p>
            Objetivo:&nbsp;<strong>{content.goal}</strong>&nbsp;&nbsp;&nbsp;
          </p>
        </header>
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={handleBack} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
          Volver a Estudio
        </button>
        <button onClick={handleShowModal} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
          Nueva Tarea
        </button>
        {content.state === 'Activa' ? (
          <button onClick={handleShowFinalizarModal} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
            Finalizar Iteración
          </button>
        ) : (
          <button onClick={handleShowActivateModal} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
            Activar Iteración
          </button>
        )}
        <button onClick={handleShowEditModal} type="button" className="btn button-primary" style={{ marginRight: '10px' }}>
          Editar Iteración
        </button>
        <Button variant="danger" onClick={handleShowDeleteModal}>
          Eliminar Iteración
        </Button>
      </div>
      <div style={{ margin: '2%' }}></div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Dashboard General"
              {...a11yProps(0)} />
              <Tab label="Dashboard Sentimientos"
              {...a11yProps(1)} />
            <Tab label="Tareas" 
            {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Dashboard General
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Dashboard Sentimientos
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TableTasks content={contentTable}></TableTasks>
        </CustomTabPanel>
      </Box>


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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default Iteration;