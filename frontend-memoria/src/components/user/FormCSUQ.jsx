import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

const FormCSUQ = () => {
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
    <>
      <div>
        <h1>Cuestionario CSUQ</h1>
        <Form>
          {preguntas.map((pregunta, index) => (
            <Form.Group key={index} as={Row}>
              <Form.Label column sm="6">{pregunta}</Form.Label>
              <Col sm="6">
                <div>
                  <Form.Check
                    type="radio"
                    id={`${index}-1`}
                    label="1 - Totalmente en desacuerdo"
                    checked={respuestas[index] === '1'}
                    onChange={() => handleRespuestaChange(index, '1')}
                  />
                  <Form.Check
                    type="radio"
                    id={`${index}-2`}
                    label="2 - En desacuerdo"
                    checked={respuestas[index] === '2'}
                    onChange={() => handleRespuestaChange(index, '2')}
                  />
                  <Form.Check
                    type="radio"
                    id={`${index}-3`}
                    label="3 - Moderadamente en desacuerdo"
                    checked={respuestas[index] === '3'}
                    onChange={() => handleRespuestaChange(index, '3')}
                  />
                  <Form.Check
                    type="radio"
                    id={`${index}-4`}
                    label="4 - Neutral"
                    checked={respuestas[index] === '4'}
                    onChange={() => handleRespuestaChange(index, '4')}
                  />
                  <Form.Check
                    type="radio"
                    id={`${index}-5`}
                    label="5 - Moderadamente de acuerdo"
                    checked={respuestas[index] === '5'}
                    onChange={() => handleRespuestaChange(index, '5')}
                  />
                  <Form.Check
                    type="radio"
                    id={`${index}-6`}
                    label="6 - De acuerdo"
                    checked={respuestas[index] === '6'}
                    onChange={() => handleRespuestaChange(index, '6')}
                  />
                  <Form.Check
                    type="radio"
                    id={`${index}-7`}
                    label="7 - Totalmente de acuerdo"
                    checked={respuestas[index] === '7'}
                    onChange={() => handleRespuestaChange(index, '7')}
                  />
                </div>
              </Col>
            </Form.Group>
          ))}
          <Button onClick={handleEnviarCuestionario} disabled={respuestas.includes(null)}>
            Enviar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default FormCSUQ;
