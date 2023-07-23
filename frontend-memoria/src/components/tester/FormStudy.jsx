import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import StudyService from "../../services/study.service";
import AuthService from "../../services/auth.service";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)
import { isURL } from "validator";
import Navbar from "../Navbar";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es requerido.
      </div>
    )
  }
}

const validURL = (value) => {
  if (!isURL(value, { allow_protocol_relative_urls: true })) {
    return (
      <div className="alert alert-danger" role="alert">
        Este no es una URL válida.
      </div>
    );
  }
};

const vsoftwarename = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        El nombre del software debe tener entre 3 y 20 caracteres.
      </div>
    );
  }
};


const FormStudy = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [softwareName, setSoftwareName] = useState("");
  const [softwareType, setSoftwareType] = useState("App Desktop");
  const [softwareUrl, setSoftwareUrl] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined);
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
    if(date>endDate && endDate !== null){
      setBadEndDate(true)
    }else{
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

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      StudyService.create(currentUser.id, softwareName, softwareType, softwareUrl, startDate, endDate).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <>
      <div className="col-md-12">
        <div className="card card-container">
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="softwarename">Nombre del Software</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="softwarename"
                    value={softwareName}
                    onChange={onChangeSoftwareName}
                    validations={[required, vsoftwarename]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputSoftwareType">Tipo de software</label>
                  <select onChange={onChangeSoftwareType} value={softwareType} id="inputSoftwareType" className="form-control">
                    <option>App Desktop</option>
                    <option>App Móvil</option>
                    <option>App Web</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="softwareurl">Sitio web Software</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="softwareurl"
                    value={softwareUrl}
                    onChange={onChangeSoftwareUrl}
                    validations={[validURL]}
                  />
                </div>

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

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Crear Estudio</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={successful ? "alert alert-success" : "alert alert-danger"}
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  )
}

export default FormStudy;