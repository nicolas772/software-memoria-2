import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import InfoModal from './InfoModal';
import RedirectModal from "./RedirectModal";

const IterationUser = () => {
  const { iditeration } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showRedirectModal, setShowRedirectModal] = useState(false)
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)
  const handleShowRedirectModal = () => setShowRedirectModal(true)
  const handleCloseRedirectModal = () => setShowRedirectModal(false)
  const handleRedirect = () => {
    navigate(url)
  }

  const handleIniciarEstudio = () => {
    const user = AuthService.getCurrentUser();
    UserService.getNextTaskForStudy(iditeration, user.id).then(
      (response) => {
        const nextTask = response.data.nextTask
        const userInTask = response.data.inTask
        const userInCSUQ = response.data.inCSUQ
        const userInQuestion = response.data.inQuestion
        if (userInTask){
          setTitleModal('Información')
          setBodyModal('¿Deseas continuar con el estudio? Si ya lo iniciaste, serás redirigido a la última tarea pendiente.')
          setUrl(`/user/doiteration/${iditeration}/${nextTask}`)
          handleShowRedirectModal()
          //navigate(`/user/doiteration/${iditeration}/${nextTask}`)
        }else if (userInCSUQ){
          setTitleModal('Información')
          setBodyModal('¿Deseas continuar con el estudio? Serás redirigido al cuestionario CSUQ.')
          setUrl(`/user/doCSUQ/${iditeration}`)
          handleShowRedirectModal()
          //navigate(`/user/doCSUQ/${iditeration}`)
        }else if (userInQuestion){
          setTitleModal('Información')
          setBodyModal('¿Deseas continuar con el estudio? Serás redirigido a las preguntas abiertas. ')
          setUrl(`/user/doQuestion/${iditeration}`)
          handleShowRedirectModal()
          //navigate(`/user/doQuestion/${iditeration}`)
        }else{
          setTitleModal('Información')
          setBodyModal('Ya completaste todas las etapas de esta iteración')
          handleShowInfoModal()
        }
        
      },
      (error) => {
        console.log(error)
      }
    )
  }

  useEffect(() => {
    UserService.getIterationWithDataStudy(iditeration).then(
      (response) => {
        setContent(response.data)
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
          <h3>Iteracion {content.iteration.iteration_number}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Estudio: {content.study.software_name}</li>
          <li type="disc">Tipo de software: {content.study.software_tipe}</li>
          <li type="disc">Url software: {content.study.url}</li>
          <li type="disc">Objetivo: {content.iteration.goal}</li>
          <li type="disc">Cantidad de tareas asociadas: {content.iteration.task_qty}</li>
        </ul>
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={handleIniciarEstudio} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>
          Iniciar Estudio
        </button>
      </div>
      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        title={titleModal}
        body={bodyModal}
      />
      <RedirectModal
        show={showRedirectModal}
        handleClose={handleCloseRedirectModal}
        handleRedirect={handleRedirect}
        title={titleModal}
        body={bodyModal}
      />
    </>
  )
}

export default IterationUser