import React, { useState } from "react";
import TaskService from "../../services/task.service";

const FormTask = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dificulty, setDificulty] = useState("Fácil");
  const [minutes, setMinutes] = useState(-1);
  const [seconds, setSeconds] = useState(-1);
  const [study, setStudy] = useState("Estudio 1");
  const [iteration, setIteration] = useState("Iteración 1");
  const [inSelection, setInSelection] = useState(true)

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const onChangeTitulo = (e) => {
    const titulo = e.target.value;
    setTitulo(titulo);
  };
  const onChangeDescripcion = (e) => {
    const descripcion = e.target.value;
    setDescripcion(descripcion);
  };
  const onChangeDificulty = (e) => {
    const dificulty = e.target.value;
    setDificulty(dificulty);
  };
  const onChangeStudy = (e) => {
    const study = e.target.value;
    setStudy(study);
  };
  const onChangeIteration = (e) => {
    const iteration = e.target.value;
    setIteration(iteration);
  };
  const handleNext = () => setInSelection(false)

  const handleBack = () => setInSelection(true)

  const handleSubmit = () => {
    console.log("crear estudio")
  }

  return (
    <>
      <div className="background-image container-create-form">
        <div className="column">
          <div className="createForm-div">
            <h1>📌 Crear Tarea</h1>
            <p>
              <strong>Cada iteración</strong> de un estudio tiene <strong>variadas tareas</strong> a realizar por los
              usuarios que testearan tu software. En este formulario, puedes
              <strong> seleccionar el estudio y la iteración </strong>para
              la cual deseas crear una tarea, proporcionando <strong>instrucciones
                lo suficientemente claras</strong> para que los usuarios puedan completarla
              sin dificultades.
            </p>
          </div>
        </div>
        <div className="column">
          {inSelection ? (
            <div className='box-createForm' style={{top:'23%'}}>
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
                <select className="form-control"
                  style={{ width: "60%", textAlign: "center" }}
                  value={iteration}
                  onChange={onChangeIteration}
                  required>
                  <option>Iteración 1</option>
                  <option>Iteración 2</option>
                  <option>Iteración 3</option>
                </select>
              </div>
              <div className="labelBox">
                <label>Selecciona una Iteración</label>
              </div>
              <div className="buttons-div">
                <button type="button" onClick={handleNext}>
                  Siguiente
                </button>
              </div>
            </div>


          ) : (

            <div className='box-createForm' style={{top:'10%'}}>
              <div className="inputBox">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa un título"
                  value={titulo}
                  onChange={onChangeTitulo}
                >
                </input>
              </div>
              <div className="labelBox">
                <label>Título de la tarea</label>
              </div>
              <div className="inputBox">
                <textarea
                  className="form-control"
                  id="miTextarea2"
                  rows={4}
                  placeholder="Ingresa descripción de la tarea"
                  value={descripcion}
                  onChange={onChangeDescripcion}
                >
                </textarea>
              </div>
              <div className="labelBox">
                <label>Descripción de la Tarea</label>
              </div>
              <div className="inputBox">
                <select className="form-control"
                  style={{ width: "60%", textAlign: "center" }}
                  value={dificulty}
                  onChange={onChangeDificulty}
                  required>
                  <option>Fácil</option>
                  <option>Medio</option>
                  <option>Difícil</option>
                </select>
              </div>
              <div className="labelBox">
                <label>Dificultad de la tarea</label>
              </div>
              <div className="container-duracion-optima">
                <div className="column-duracion-optima-right">
                  <select className="form-control"
                    style={{ width: "70%", textAlign: "center" }}
                    value={minutes}
                    onChange={handleMinutesChange}
                    required>
                    <option value="">Minutos</option>
                    {Array.from({ length: 60 }, (_, index) => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="column-dots">:</div>
                <div className="column-duracion-optima-left">
                  <select className="form-control"
                    style={{ width: "70%", textAlign: "center" }}
                    value={seconds}
                    onChange={handleSecondsChange}
                    required>
                    <option value="">Segundos</option>
                    {Array.from({ length: 60 }, (_, index) => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="labelBox">
                <label>Duración óptima de la tarea</label>
              </div>
              <div className="buttons-div">
                <button type="button" onClick={handleBack}>
                  Volver
                </button>
                <button type="button" onClick={handleSubmit}>
                  Crear Tarea
                </button>
              </div>
            </div>

          )}

        </div>
      </div>
    </>
  )
}

export default FormTask;