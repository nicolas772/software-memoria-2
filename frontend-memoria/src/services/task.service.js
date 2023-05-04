import axios from "axios";

const API_URL = "http://localhost:8080/api/task/";

const create = (iditeration, titulo, descripcion, dificulty, minutes, seconds) => {
  return axios.post(API_URL + "create", {
    iditeration,
    titulo,
    descripcion,
    dificulty,
    minutes,
    seconds,
  });
}

const TaskService = {
  create,
};

export default TaskService;