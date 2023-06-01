import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const FormSentimentAnalisis = () => {
  const [texto, setTexto] = useState('');

  const handleChangeTexto = (event) => {
    setTexto(event.target.value);
  };

  const handleClickEnviar = () => {
    // Aquí puedes realizar la lógica para enviar el texto
    console.log(texto);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <Form.Group>
            <Form.Control as="textarea" rows={4} value={texto} onChange={handleChangeTexto} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={6} className="text-center">
          <Button variant="primary" onClick={handleClickEnviar}>Enviar</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default FormSentimentAnalisis;
