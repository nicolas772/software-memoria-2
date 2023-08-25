import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Nav } from 'react-bootstrap';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import { FaHome } from 'react-icons/fa'; // Importa el ícono de Home de Font Awesome
import InfoModal from './InfoModal';

const enunciados = [
  '1. Expresa tu opinión respecto a la interfaz del software.',
  '2. Expresa tu opinión general respecto al software.'
];


const subtitulo = `Te invitamos a compartir tus opiniones sobre la interfaz probada 
y tus impresiones generales del software. Tu aporte es esencial para nuestra mejora continua. 
Juntos, podemos perfeccionar la plataforma en base a tus comentarios.`

function FormSentimentAnalisis() {
  const { iditeration } = useParams();
  const [respuestas, setRespuestas] = useState(Array(enunciados.length).fill(''));
  const [prefieroNoOpinar, setPrefieroNoOpinar] = useState(Array(enunciados.length).fill(false));
  const [actualQuestion, setActualQuestion] = useState(0)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [lastQuestion, setLastQuestion] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const navigate = useNavigate()

  const handleShowInfoModal = () => setShowInfoModal(true)
  const handleCloseInfoModal = () => setShowInfoModal(false)

  const handleChangeOpinion = (event) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[actualQuestion] = event.target.value;
    setRespuestas(nuevasRespuestas);
  };

  const handleChangePrefieroNoOpinar = (event) => {
    const nuevasPreferencias = [...prefieroNoOpinar];
    nuevasPreferencias[actualQuestion] = event.target.checked;
    setPrefieroNoOpinar(nuevasPreferencias);
  };

  const handleNextQuestion = () => {
    if (!prefieroNoOpinar[actualQuestion] && (respuestas[actualQuestion].trim().split(' ').length <= 1)) {
      setTitleModal('Información')
      setBodyModal('Escribe una opinión más extensa, o selecciona la opción "Prefiero no opinar"')
      handleShowInfoModal()
    } else {
      setActualQuestion(actualQuestion + 1)
      setLastQuestion(true)
    }
  }

  const handlePrevQuestion = () => {
    setLastQuestion(false)
    setActualQuestion(actualQuestion - 1)
  }

  const handleSubmit = () => {
    if (!prefieroNoOpinar[actualQuestion] && (respuestas[actualQuestion].trim().split(' ').length <= 1)) {
      setTitleModal('Información')
      setBodyModal('Escribe una opinión más extensa, o selecciona la opción "Prefiero no opinar"')
      handleShowInfoModal()
    } else {
      const user = AuthService.getCurrentUser();
      UserService.postOpenAnswer(iditeration, user.id, respuestas[0], respuestas[1], prefieroNoOpinar[0], prefieroNoOpinar[1]).then(
        (response) => {
          //redireccionar a inicio
          navigate('/homeUser')
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  return (
    <>
      <div className="gradient-background-tasks">
        <a href="/homeUser" className="home-link">
          <FaHome className="home-icon" />
          <span className="home-text">Volver a Inicio</span>
        </a>
        <div className="title-container-csuq">
          <h1 className="component-title">¡Valoramos tu opinión!</h1>
          <h2 className="component-subtitle-sentiment">{subtitulo}</h2>
        </div>
        <div className="box-csuq">
          <p>{enunciados[actualQuestion]}</p>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              value={respuestas[actualQuestion]}
              onChange={handleChangeOpinion}
              disabled={prefieroNoOpinar[actualQuestion]}
              className="disable-resize" // Agrega la clase aquí
            />
          </Form.Group>
          <div className="buttons-div-sentiment">
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Prefiero no opinar"
                checked={prefieroNoOpinar[actualQuestion]}
                onChange={handleChangePrefieroNoOpinar}
                className="custom-label-color"
              />
            </Form.Group>
            {lastQuestion ? (
              <>
                <button type="button" onClick={handlePrevQuestion}>
                  Atras
                </button>
                <button type="button" onClick={handleSubmit}>
                  Terminar Estudio
                </button>
              </>
            ) : (
              <button type="button" onClick={handleNextQuestion}>
                Siguiente
              </button>
            )}


          </div>
        </div>
        <div className="page-indicator">
          {actualQuestion + 1} de 2
        </div>
      </div>
      <InfoModal
        show={showInfoModal}
        handleClose={handleCloseInfoModal}
        title={titleModal}
        body={bodyModal}
      />
    </>
  );
}

export default FormSentimentAnalisis;
