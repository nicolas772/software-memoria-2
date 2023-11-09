import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import IterationService from "../../services/iteration.service";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es'); // Configura dayjs para español

function ModalEditIteration(props) {
  const { show, handleClose, iditeration, content } = props;
  const [objetivo, setObjetivo] = useState(content.goal);
  const [startDate, setStartDate] = useState(dayjs(content.start_date));
  const [endDate, setEndDate] = useState(dayjs(content.end_date));
  const [badEndDate, setBadEndDate] = useState(false)
  const [noGoal, setNoGoal] = useState(false)

  const onChangeObjetivo = (e) => {
    const objetivo = e.target.value;
    setObjetivo(objetivo);
    setNoGoal(false)
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
    if (objetivo === "") {
      setNoGoal(true)
    } else {
      IterationService.update(iditeration, objetivo, startDate, endDate).then(
        (response) => {
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
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#344b60', fontFamily: "Poppins, sans-serif" }}>Modificar Iteración</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formObjetivo">
              <Form.Label style={{ color: '#344b60', fontFamily: "Poppins, sans-serif" }}>Objetivo de la nueva iteración</Form.Label>
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

              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <label htmlFor="initdate" style={{ color: '#344b60', fontFamily: "Poppins, sans-serif" }}>Fecha Inicio de Iteración</label>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    value={startDate}
                    onChange={handleStartCalendar}

                  />
                </DemoContainer>
                <label htmlFor="initdate" style={{ color: '#344b60', fontFamily: "Poppins, sans-serif", marginTop: "4%" }}>Fecha Fin de Iteración</label>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    value={endDate}
                    onChange={handleEndCalendar}

                  />
                </DemoContainer>
              </LocalizationProvider>
              {badEndDate && (
                <div className="alert alert-danger" role="alert" style={{ marginTop: '2%' }}>
                  La fecha de término de iteración debe ser posterior a la fecha de inicio.
                </div>
              )}
              {noGoal && (
                <div className="alert alert-danger" role="alert" style={{ marginTop: '2%' }}>
                  Ingresa un objetivo para la nueva iteración.
                </div>
              )}
            </div>


            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%'
              }}>
              <Button variant="primary" type="submit" className="btn button-primary">
                Editar Iteración
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditIteration;
