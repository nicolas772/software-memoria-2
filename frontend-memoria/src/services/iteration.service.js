import axios from "axios";

const API_URL = "http://localhost:8080/api/iteration/";

const create = (idstudy, objetivo, startDate, endDate) => {
  return axios.post(API_URL + "create", {
    idstudy,
    objetivo,
    startDate,
    endDate,
  });
}

const update = (iditeration, objetivo, startDate, endDate) => {
  return axios.put(API_URL + "update", {
    iditeration,
    objetivo,
    startDate,
    endDate,
  })
}

const deleteIteration = (idIteration, idStudy) => {
  return axios.delete(API_URL + "delete", { params: { idIteration: idIteration, idStudy: idStudy }  })
}

const IterationService = {
  create,
  update,
  deleteIteration,
};

export default IterationService;