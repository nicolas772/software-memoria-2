import React, { useState } from "react";
import IterationService from "../../services/iteration.service";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const FormIteration = () => {
  const [objetivo, setObjetivo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [badEndDate, setBadEndDate] = useState(false)
  const [study, setStudy] = useState("Estudio 1");

  const onChangeObjetivo = (e) => {
    const objetivo = e.target.value;
    setObjetivo(objetivo);
  };

  const onChangeStudy = (e) => {
    const softwareType = e.target.value;
    setStudy(softwareType);
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

  const handleSubmit = () => {
    console.log("crear estudio")
  }

  return (
    <>
      <div className="background-image container-create-form">
        <div className="column">
          <div className="createForm-div">
            <h1>🔃 Crear Iteración</h1>
            <p>
              Un estudio de usabilidad puede experimentar <strong>múltiples iteraciones de mejora
                continua</strong>. En este contexto, tienes la posibilidad de crear una nueva
              iteración, <strong>seleccionando el estudio</strong> deseado en el menú desplegable y
              <strong> completando los campos </strong>requeridos en siguiente formulario.
            </p>
          </div>
        </div>
        <div className="column">
          <div className='box-createForm'>
            <div className="inputBox">
              <select className="form-control"
                style={{ width: "60%", textAlign: "center" }}
                value={study}
                onChange={onChangeStudy}
                required>
                <option>Estudio 1</option>
                <option>Estudio 2</option>
                <option>Estudio 3</option>
              </select>
            </div>
            <div className="labelBox">
              <label>Selecciona un estudio</label>
            </div>
            <div className="inputBox">
              <textarea
                className="form-control"
                id="miTextarea"
                rows={2}
                placeholder="Ingresa objetivo"
                value={objetivo}
                onChange={onChangeObjetivo}
              >
              </textarea>
            </div>
            <div className="labelBox">
              <label>Objetivo de la Iteración</label>
            </div>
            <div className="inputBox">
              <DatePicker
                locale="es"
                selected={startDate}
                onChange={handleStartCalendar}
                minDate={new Date()}
                showDisabledMonthNavigation
                placeholderText="mm/dd/aaaa"
                className="form-control"
              />
            </div>
            <div className="labelBox">
              <label>Fecha de Inicio Iteración</label>
            </div>
            <div className="inputBox">
              <DatePicker
                locale="es"
                selected={endDate}
                onChange={handleEndCalendar}
                minDate={new Date()}
                showDisabledMonthNavigation
                placeholderText="mm/dd/aaaa"
                className="form-control"
              />
            </div>
            <div className="labelBox">
              <label>Fecha de Término Iteración</label>
            </div>
            {badEndDate && (
              <div className="alert alert-danger" role="alert">
                La fecha de término de Iteración debe ser posterior a la fecha de inicio.
              </div>
            )}
            <div className="buttons-div">
              <button type="button" onClick={handleSubmit}>
                Crear Iteración
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormIteration;