import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const IterationUser = () => {
  const { iditeration } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleIniciarEstudio = () => {
    //aqui se debe crear un registro en la tabla iteration_state
    //se debe tambien leer, para reanudar el estudio desde la ultima tarea en la que quedo
    //se debe actualizar +1 user_qty en la iteration
    const idtask = 1
    navigate(`/user/doiteration/${iditeration}/${idtask}`)
  }

  useEffect(() => {
    UserService.getIterationWithDataStudy(iditeration).then(
      (response) => {
        setContent(response.data)
        setLoading(false)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>Iteracion {content.iteration.iteration_number}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Estudio: {content.study.software_name}</li>
          <li type="disc">Tipo de software: {content.study.software_tipe}</li>
          <li type="disc">Url software: {content.study.url}</li>
          <li type="disc">Objetivo: {content.iteration.goal}</li>
          <li type="disc">Cantidad de tareas asociadas: {content.iteration.task_qty}</li>
        </ul>
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={handleIniciarEstudio} type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>
          Iniciar Estudio
        </button>
      </div>
    </>
  )
}

export default IterationUser