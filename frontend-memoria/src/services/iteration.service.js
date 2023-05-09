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

const IterationService = {
  create,
  update,
};

export default IterationService;