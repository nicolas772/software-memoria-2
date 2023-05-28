import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

const IterationUser = () => {
  const { iditeration } = useParams();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleIniciarEstudio = () => {
    const user = AuthService.getCurrentUser();
    UserService.getNextTaskForStudy(iditeration, user.id).then(
      (response) => {
        const nextTask = response.data.nextTask
        const userInTask = response.data.inTask
        const userInCSUQ = response.data.inCSUQ
        const userInQuestion = response.data.inQuestion
        if (userInTask){
          navigate(`/user/doiteration/${iditeration}/${nextTask}`)
        }else if (userInCSUQ){
          navigate(`/user/doCSUQ/${iditeration}`)
        }else if (userInQuestion){
          navigate(`/user/doQuestion/${iditeration}`)
        }else{
          console.log('ya hiciste esta iteracion')
        }
        
      },
      (error) => {
        console.log(error)
      }
    )
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