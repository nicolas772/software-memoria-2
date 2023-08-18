import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import { FaHome } from 'react-icons/fa'; // Importa el ícono de Home de Font Awesome

const FormCSUQ = () => {
  const likertScale = [
    "Totalmente en desacuerdo",
    "Bastante en desacuerdo",
    "En desacuerdo",
    "Indiferente",
    "De acuerdo",
    "Bastante de acuerdo",
    "Totalmente de acuerdo"
  ];
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioClick = (event) => {
    setSelectedValue(event.target.value);
  };

  const preguntas = [
    'En general, estoy satisfecho con lo facil que es utilizar este software.',
    'Fue simple utilizar este software.',
    'Soy capaz de completar mi trabajo rápidamente utilizando este software.',
    'Me siento comodo utilizando este software.',
    'Fue fácil aprender a utilizar este software.',
    'Creo que me volví experto rapidamente utilizando este software.',
    'El software muestra mensajes de error que me dicen claramente cómo resolver los problemas.',
    'Cada vez que cometo un error utilizando el software, lo resuelvo fácil y rapidamente.',
    'La información (como ayuda en linea, mensajes en pantalla y otra documentación) que provee el software es clara.',
    'Es fácil encontrar en el software la información que necesito.',
    'La información que proporciona el software fue efectiva ayudándome a completar las tareas.',
    'La organización de la información del software en la pantalla fue clara.',
    'La interfaz del software fue placentera.',
    'Me gustó utilizar el software.',
    'El software tuvo todas las herramientas que esperaba que tuviera.',
    'En general, estuve satisfecho con el software.'
  ];
  const subtitulo = 'El siguiente cuestionario consta de 16 preguntas diseñadas para evaluar tu satisfacción como usuario del software. Cada pregunta te presenta una escala de respuestas del 1 al 7, donde 1 significa "Totalmente en desacuerdo" y 7 significa "Totalmente de acuerdo".'
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null));
  const { iditeration } = useParams();
  const navigate = useNavigate()

  const handleRespuestaChange = (index, valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = valor;
    setRespuestas(nuevasRespuestas);
  };

  const handleEnviarCuestionario = () => {
    // Aquí puedes realizar la lógica para enviar las respuestas
    const respuestasInt = respuestas.map(str => parseInt(str));
    const user = AuthService.getCurrentUser();
    UserService.postCSUQAnswers(iditeration, user.id, respuestasInt).then(
      (response) => {
        navigate(`/user/doQuestion/${iditeration}`)
      },
      (error) => {
        console.log(error)
      }
    )
  };

  return (
    <div className="gradient-background-csuq">
      <a href="/homeUser" className="home-link">
        <FaHome className="home-icon" />
        <span className="home-text">Volver a Inicio</span>
      </a>
      <div className="title-container-csuq">
        <h1 className="component-title">Cuestionario CSUQ</h1>
        <h2 className="component-subtitle-csuq">{subtitulo}</h2>
      </div>
      <div className="box-csuq">
        <p>1. {preguntas[0]}</p>
        <div className="range">
          {likertScale.map((value) => (
            <div className="range__level" key={value}>
              <input
                id={value}
                type="radio"
                name="range"
                value={value}
                checked={selectedValue === value.toString()}
                onChange={handleRadioClick}
              />
              <label htmlFor={value} className={`range__radio ${selectedValue === value.toString() ? "selected" : "unselected"}`} data-label={`${value}`}></label>
            </div>
          ))}
        </div>

        <div className="buttons-div">
          <button type="button">
            Anterior
          </button>
          <button type="button">
            Siguiente
          </button>
        </div>
      </div>
      <div className="page-indicator">
        1 de 16
      </div>
    </div>

  );
}

export default FormCSUQ;
