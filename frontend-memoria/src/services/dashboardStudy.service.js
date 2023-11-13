import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/";

//DASHBOARD GENERAL ESTUDIO

const getCardsContentGeneral = (idStudy) => {
    return axios.get(API_URL + "study/general/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};


const DashboardStudyService = {
    getCardsContentGeneral
};

export default DashboardStudyService;