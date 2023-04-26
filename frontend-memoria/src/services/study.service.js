import axios from "axios";

const API_URL = "http://localhost:8080/api/study/";

const create = (testerId, softwareName, softwareType, softwareUrl, startDate, endDate) => {
  //alert(testerId + softwareName + softwareType + softwareUrl + startDate + endDate)
  return axios.post(API_URL + "create", {
    softwareName,
    softwareType,
    softwareUrl,
    testerId,
    startDate,
    endDate,
  });
};

const StudyService = {
  create,
};

export default StudyService;