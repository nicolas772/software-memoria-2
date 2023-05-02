import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import IterationService from "../../services/iteration.service";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

function ModalForm(props) {
  const { show, handleClose, idstudy } = props;
  const [objetivo, setObjetivo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [badEndDate, setBadEndDate] = useState(false)

  const onChangeObjetivo = (e) => {
    const objetivo = e.target.value;
    setObjetivo(objetivo);
  };

  const handleStartCalendar = (date) => {
    setStartDate(date)
    if (date > endDate && endDate !== null) {
      setBadEndDate(true)
    } else {
      setBadEndDate(false)
    }
  }

  const handleEndCalendar = (date) => {
    setEndDate(date)
    if (date < startDate) {
      setBadEndDate(true)
    } else {
      setBadEndDate(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede realizar la lógica para enviar los datos del formulario
    IterationService.create(idstudy, objetivo, startDate, endDate).then(
      (response) => {
        setObjetivo("")
        setStartDate()
        setEndDate()
        setBadEndDate(false)
        handleClose();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Iteración</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formObjetivo">
              <Form.Label>Objetivo de la nueva iteración</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa el objetivo"
                name="objetivo"
                value={objetivo}
                onChange={onChangeObjetivo}
              />
            </Form.Group>

            <div className="form-group">
              <label htmlFor="initdate">Fecha Inicio de Iteración</label>
              <DatePicker
                locale="es"
                selected={startDate}
                onChange={handleStartCalendar}
                minDate={new Date()}
                showDisabledMonthNavigation
                placeholderText="mm/dd/aaaa"
              />
            </div>

            <div className="form-group">
              <label htmlFor="enddate">Fecha Término de Iteración</label>
              <DatePicker
                locale="es"
                selected={endDate}
                onChange={handleEndCalendar}
                minDate={new Date()}
                showDisabledMonthNavigation
                placeholderText="mm/dd/aaaa"
              />
              {badEndDate && (
                <div className="alert alert-danger" role="alert">
                  La fecha de término de iteración debe ser posterior a la fecha de inicio.
                </div>
              )}
            </div>
            <Button variant="primary" type="submit">
              Crear Iteración
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalForm;
