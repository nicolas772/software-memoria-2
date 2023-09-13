import React, { useState } from "react";
import StudyService from "../../services/study.service";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)


const FormStudy = () => {
  const [softwareName, setSoftwareName] = useState("");
  const [softwareType, setSoftwareType] = useState("App Desktop");
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

  const handleSubmit = () => {
    console.log("crear estudio")
  }

  return (
    <>
      <div className="container-create-form">
        <div className="createForm-div">
          <h1>📘 Crear Estudio</h1>
          <p>
            Para dar inicio a tu experiencia en la plataforma <strong>Feel UX</strong> y
            comenzar a realizar tus estudios de usabilidad, es esencial crear un estudio,
            <strong> completando todos los campos</strong> del formulario que se presenta a
            continuación.
          </p>
          <div className='box-createForm'>
            <div className="inputBox">
              <input
                type="text"
                className="form-control"
                value={softwareName}
                onChange={onChangeSoftwareName}
              >
              </input>
            </div>
            <div className="labelBox">
              <label>Nombre del Software</label>
            </div>
            <div className="inputBox">
              <select className="form-control"
                style={{ width: "60%", textAlign: "center" }}
                value={softwareType}
                onChange={onChangeSoftwareType}
                required>
                <option>App Desktop</option>
                <option>App Móvil</option>
                <option>App Web</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="labelBox">
              <label>Tipo de Software</label>
            </div>
            <div className="inputBox">
              <input
                type="text"
                className="form-control"
                value={softwareUrl}
                onChange={onChangeSoftwareUrl}
              >
              </input>
            </div>
            <div className="labelBox">
              <label>URL del Software</label>
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
              <label>Fecha de Inicio Estudio</label>
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
              <label>Fecha de Término Estudio</label>
            </div>
            {badEndDate && (
                <div className="alert alert-danger" role="alert">
                  La fecha de término de estudio debe ser posterior a la fecha de inicio.
                </div>
              )}
            <div className="buttons-div">
              <button type="button" onClick={handleSubmit}>
                Crear Estudio
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormStudy;