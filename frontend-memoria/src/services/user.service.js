import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
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

const getNextTaskForStudy = (idIteration, idUser) => {
  return axios.get(API_URL + "next-task", { headers: authHeader(), params: { idIteration: idIteration, idUser: idUser }  });
}

const postCSUQAnswers = (idIteration, idUser, respuestas) => {
  return axios.post(API_URL + "csuq-answers", {
    idUser: idUser,
    idIteration: idIteration,
    respuestas: respuestas
  });
}

const postOpenAnswer = (idIteration, idUser, opinion1, opinion2, prefieroNoOpinar1, prefieroNoOpinar2) => {
  return axios.post(API_URL + "open-answer", {
    idUser: idUser,
    idIteration: idIteration,
    opinion1: opinion1,
    opinion2: opinion2,
    prefieroNoOpinar1: prefieroNoOpinar1,
    prefieroNoOpinar2: prefieroNoOpinar2,
  });
}

const updateProfile = (idUser, username, email, sex, birthdayToSend) => {
  return axios.put(API_URL + "update-profile", {
    idUser: idUser,
    username: username,
    email: email,
    sex: sex,
    birthday: birthdayToSend
  })
}

const updatePassword = (idUser, actualPass, newPass) => {
  return axios.put(API_URL + "update-pass", {
    idUser: idUser,
    actualPass: actualPass,
    newPass: newPass
  })
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getStudies,
  getStudy,
  getIterations,
  getIteration,
  getTasks,
  getTask,
  getIterationWithDataStudy,
  getNextTaskForStudy,
  postCSUQAnswers,
  postOpenAnswer,
  updateProfile,
  updatePassword,
};

export default UserService;