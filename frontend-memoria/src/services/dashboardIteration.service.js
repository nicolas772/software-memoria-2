import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/";

//DASHBOARD GENERAL ESTUDIO

const getCardsContentGeneral = (idIteration) => {
    return axios.get(API_URL + "iteration/general/cards", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getTableTimeContentGeneral = (idIteration) => {
    return axios.get(API_URL + "iteration/general/table-time", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getPieChartContentGeneral = (idIteration) => {
    return axios.get(API_URL + "iteration/general/pie-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const DashboardStudyService = {
    getCardsContentGeneral,
    getTableTimeContentGeneral,
    getPieChartContentGeneral,
};

export default DashboardStudyService;