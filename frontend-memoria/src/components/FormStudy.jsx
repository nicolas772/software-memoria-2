import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import StudyService from "../services/study.service";
import AuthService from "../services/auth.service";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es requerido.
      </div>
    )
  }
}

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
  const [softwareType, setSoftwareType] = useState("");
  const [softwareUrl, setSoftwareUrl] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeSoftwareName = (e) => {
    const softwareName = e.target.value;
    setSoftwareName(softwareName);
    console.log(softwareName)
  };
  const onChangeSoftwareType = (e) => {
    const softwareType = e.target.value;
    setSoftwareType(softwareType);
    console.log(softwareType)
  };
  const onChangeSoftwareUrl = (e) => {
    const softwareUrl = e.target.value;
    setSoftwareUrl(softwareUrl);
    console.log(softwareUrl)
  };

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
      StudyService.create(currentUser.id, softwareName, softwareType, softwareUrl).then(
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
                />
              </div>

              <div className="form-group">
                <label htmlFor="initdate">Fecha Inicio de Estudio</label>
                <DatePicker
                  locale="es"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
                
              <div className="form-group">
                <label htmlFor="enddate">Fecha Término de Estudio</label>
                <DatePicker
                  locale="es"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
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
  )
}

export default FormStudy;