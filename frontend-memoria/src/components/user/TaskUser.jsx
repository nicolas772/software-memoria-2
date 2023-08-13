import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import TaskService from "../../services/task.service";
import AuthService from "../../services/auth.service";
import { FaHome } from 'react-icons/fa'; // Importa el ícono de Home de Font Awesome

const TaskUser = () => {
  const { iditeration, idtask } = useParams();
  const [actualTask, setActualTask] = useState(idtask)
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true)
  const [tareaIniciada, setTareaIniciada] = useState(false);
  const [tiempoInicio, setTiempoInicio] = useState();
  const [duration, setDuration] = useState()
  const [mostrarBotones, setMostrarBotones] = useState(true);
  const navigate = useNavigate()

  const handleIniciarTarea = () => {
    setTareaIniciada(true);
    setTiempoInicio(new Date()); // Guardar el tiempo de inicio
  }

  const handleFinalizarTarea = () => {
    if (tiempoInicio) {
      setTareaIniciada(false);
      const finalizacion = new Date()
      const tiempoDiferencia = finalizacion.getTime() - tiempoInicio.getTime();
      setDuration(tiempoDiferencia)
      setMostrarBotones(false);
    }
  }

  const handleTareaCompletada = (complete) => {
    const user = AuthService.getCurrentUser();
    TaskService.createTaskInfo(user.id, iditeration, actualTask, complete, duration).then(
      (response) => {
        if (response.data.finish) {
          navigate(`/user/doCSUQ/${iditeration}`)
        } else {
          setActualTask(response.data.nextTask)
          setMostrarBotones(true)
        }
      },
      (error) => {
        console.log(error)
      }
    )
  };

  useEffect(() => {
    UserService.getTask(actualTask).then(
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
  }, [actualTask]);

  if (loading) {
    return <div>Cargando...</div>
  }
  return (
    <div className="gradient-background-tasks">
      <a href="/homeUser" className="home-link">
        <FaHome className="home-icon" />
        <span className="home-text">Volver a Inicio</span>
      </a>
      <div className="title-container">
        <h1 className="component-title">Tarea 1</h1>
        <h2 className="component-subtitle">Crear una nueva publicación</h2>
      </div>
      <div className="box-task">
        <p>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
        </p>
        <button onClick={() => handleTareaCompletada(true)} type="button">
            Tarea completada
          </button>
          <button onClick={() => handleTareaCompletada(false)} type="button">
            Tarea no completada
          </button>
      </div>
      <div className="page-indicator">
        1 de 3
      </div>
    </div>
  )
}

export default TaskUser