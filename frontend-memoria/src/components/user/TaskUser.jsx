import { useParams } from "react-router-dom";

const TaskUser = () => {
  const { iditeration } = useParams();
  return (
    <h3>Tareas de iteracion {iditeration}</h3>
  )
}

export default TaskUser