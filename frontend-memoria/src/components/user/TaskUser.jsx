import { useParams } from "react-router-dom";

const TaskUser = () => {
  const { iditeration, idtask } = useParams();
  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>Tarea {idtask}</h3>
        </header>
      </div>
    </>
  )
}

export default TaskUser