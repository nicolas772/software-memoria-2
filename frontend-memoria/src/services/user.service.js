import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getTesterBoard = () => {
  return axios.get(API_URL + "tester", { headers: authHeader() });
};

const getStudies = () => {
  return axios.get(API_URL + "studies", { headers: authHeader() });
}


const getStudy = (id) => {
  return axios.get(API_URL + "study", { headers: authHeader(), params: { id: id } });
}

const getIterations = (idStudy) => {
  return axios.get(API_URL + "iterations", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const getIteration = (idIteration) => {
  return axios.get(API_URL + "iteration", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getIterationWithDataStudy = (idIteration) => {
  return axios.get(API_URL + "iteration-user", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getTasks = (idIteration) => {
  return axios.get(API_URL + "tasks", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getTask = (idTask) => {
  return axios.get(API_URL + "task", { headers: authHeader(), params: { idTask: idTask }  });
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getTesterBoard,
  getStudies,
  getStudy,
  getIterations,
  getIteration,
  getTasks,
  getTask,
  getIterationWithDataStudy,
};

export default UserService;