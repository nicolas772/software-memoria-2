import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from "../../services/user.service";

const Task = () => {
  const { idtask } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)

  const handleShowModal = () => {
    console.log('editar tarea')
  }

  useEffect(() => {
    UserService.getTask(idtask).then(
      (response) => {
        setContent(response.data);
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

  if(loading){
    return <div>Cargando...</div>
  }

  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>{content.title}</h3>
        </header>
      </div>
      <div>
        <ul>
          <li type="disc">Descripción: {content.description}</li>
          <li type="disc">Dificultad: {content.dificulty}</li>
          <li type="disc">Tiempo optimo: {content.minutes_optimal} minutos y {content.seconds_optimal} segundos</li>
        </ul>
      </div>

      <button onClick={handleShowModal} type="button" className="btn btn-primary">
        Editar Tarea
      </button>
      <div style={{margin: 50}}></div>
    </>
  )
}

export default Task;