import axios from "axios";

const API_URL = "http://localhost:8080/api/study/";

const create = (testerId, softwareName, softwareType, softwareUrl) => {
  alert(testerId + softwareName + softwareType + softwareUrl)
  /*return axios.post(API_URL + "create", {
    testerId,
    softwareName,
    softwareType,
    softwareUrl
  });*/
};

const StudyService = {
  create,
};

export default StudyService;