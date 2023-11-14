import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/";

//DASHBOARD GENERAL ESTUDIO

const getCardsContentGeneral = (idStudy) => {
    return axios.get(API_URL + "study/general/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getBarListContentGeneral = (idStudy) => {
    return axios.get(API_URL + "study/general/bar-list", { headers: authHeader(), params: { idStudy: idStudy }  });

}

const getBarChartContentGeneral = (idStudy) => {
    return axios.get(API_URL + "study/general/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const DashboardStudyService = {
    getCardsContentGeneral,
    getBarListContentGeneral,
    getBarChartContentGeneral
};

export default DashboardStudyService;