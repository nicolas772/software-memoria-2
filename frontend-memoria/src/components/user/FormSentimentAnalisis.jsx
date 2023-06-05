import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';

function FormSentimentAnalisis() {
  const { iditeration } = useParams();
  const [opinion1, setOpinion1] = useState('');
  const [opinion2, setOpinion2] = useState('');
  const [prefieroNoOpinar1, setPrefieroNoOpinar1] = useState(false);
  const [prefieroNoOpinar2, setPrefieroNoOpinar2] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate()

  const handleChangeOpinion1 = (event) => {
    setOpinion1(event.target.value);
    checkSubmitButton(event.target.value, opinion2, prefieroNoOpinar1, prefieroNoOpinar2);
  };

  const handleChangeOpinion2 = (event) => {
    setOpinion2(event.target.value);
    checkSubmitButton(opinion1, event.target.value, prefieroNoOpinar1, prefieroNoOpinar2);
  };

  const handleChangePrefieroNoOpinar1 = (event) => {
    setPrefieroNoOpinar1(event.target.checked);
    checkSubmitButton(opinion1, opinion2, event.target.checked, prefieroNoOpinar2);
  };

  const handleChangePrefieroNoOpinar2 = (event) => {
    setPrefieroNoOpinar2(event.target.checked);
    checkSubmitButton(opinion1, opinion2, prefieroNoOpinar1, event.target.checked);
  };

  const checkSubmitButton = (opinion1Value, opinion2Value, prefieroNoOpinarValue1, prefieroNoOpinarValue2) => {
    if ((prefieroNoOpinarValue1 && prefieroNoOpinarValue2) || 
        (opinion1Value.trim().split(' ').length > 1 && opinion2Value.trim().split(' ').length > 1) ||
        (opinion1Value.trim().split(' ').length > 1 && prefieroNoOpinarValue2) ||
        (opinion2Value.trim().split(' ').length > 1 && prefieroNoOpinarValue1)
        ){
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para enviar las opiniones
    const user = AuthService.getCurrentUser();
    UserService.postOpenAnswer(iditeration, user.id, opinion1, opinion2, prefieroNoOpinar1, prefieroNoOpinar2).then(
      (response) => {
        //redireccionar a inicio
        navigate('/user')
      },
      (error) => {
        console.log(error)
      }
    )
  };

  return (
    <div className="my-4">
      <Form.Group className="mb-3">
        <Form.Label>Escribe tu opinión respecto a la Interfaz del software:</Form.Label>
        <Form.Control as="textarea" rows={3} value={opinion1} onChange={handleChangeOpinion1} disabled={prefieroNoOpinar1}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Prefiero no opinar"
          checked={prefieroNoOpinar1}
          onChange={handleChangePrefieroNoOpinar1}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Escribe tu opinión general respecto al software:</Form.Label>
        <Form.Control as="textarea" rows={3} value={opinion2} onChange={handleChangeOpinion2} disabled={prefieroNoOpinar2}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Prefiero no opinar"
          checked={prefieroNoOpinar2}
          onChange={handleChangePrefieroNoOpinar2}
        />
      </Form.Group>
      <Button variant="primary" disabled={submitDisabled} onClick={handleSubmit}>
        Enviar
      </Button>
    </div>
  );
}

export default FormSentimentAnalisis;
