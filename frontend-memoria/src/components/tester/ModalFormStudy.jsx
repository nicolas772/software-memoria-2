import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import StudyService from "../../services/study.service";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

function ModalFormStudy(props) {
  const { show, handleClose, userId } = props;
  const [softwareName, setSoftwareName] = useState("");
  const [softwareType, setSoftwareType] = useState("");
  const [softwareUrl, setSoftwareUrl] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [badEndDate, setBadEndDate] = useState(false)

  const onChangeSoftwareName = (e) => {
    const softwareName = e.target.value;
    setSoftwareName(softwareName);
  };
  const onChangeSoftwareType = (e) => {
    const softwareType = e.target.value;
    setSoftwareType(softwareType);
  };
  const onChangeSoftwareUrl = (e) => {
    const softwareUrl = e.target.value;
    setSoftwareUrl(softwareUrl);
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
    StudyService.create(userId, softwareName, softwareType, softwareUrl, startDate, endDate).then(
      (response) => {
        setSoftwareName("")
        setSoftwareType("")
        setSoftwareUrl("")
        setStartDate()
        setEndDate()
        setBadEndDate(false)
        handleClose();
        window.location.reload();
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
          <Modal.Title>Nuevo Estudio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSoftwareName">
              <Form.Label>Nombre del software</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa un nombre."
                name="softwareName"
                value={softwareName}
                onChange={onChangeSoftwareName}
              />
            </Form.Group>

            <div className="form-group">
              <label htmlFor="inputSoftwareType">Tipo de software</label>
              <select onChange={onChangeSoftwareType} value={softwareType} id="inputSoftwareType" className="form-control">
                <option>App Desktop</option>
                <option>App Móvil</option>
                <option>App Web</option>
                <option>Otro</option>
              </select>
            </div>

            <Form.Group controlId="formUrl">
              <Form.Label>URL del software</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa una URL"
                name="Url"
                value={softwareUrl}
                onChange={onChangeSoftwareUrl}
              />
            </Form.Group>

            <div className="form-group">
              <label htmlFor="initdate">Fecha Inicio de Estudio</label>
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
              <label htmlFor="enddate">Fecha Término de Estudio</label>
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
                  La fecha de término de estudio debe ser posterior a la fecha de inicio.
                </div>
              )}
            </div>
            <Button variant="primary" type="submit">
              Crear Estudio
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalFormStudy;
