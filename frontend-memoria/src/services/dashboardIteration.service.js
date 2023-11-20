import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/iteration/";

//DASHBOARD GENERAL ITERACIÓN

const getCardsContentGeneral = (idIteration) => {
    return axios.get(API_URL + "general/cards", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const getTableTimeContentGeneral = (idIteration) => {
    return axios.get(API_URL + "general/table-time", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getPieChartContentGeneral = (idIteration) => {
    return axios.get(API_URL + "general/pie-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
}

const getBarChartContentGeneral = (idIteration) => {
    return axios.get(API_URL + "general/bar-chart", { headers: authHeader(), params: { idIteration: idIteration }  });
}

//DASHBOARD DEMOGRÁFICO ITERACIÓN

const getCardsContentDemogr = (idIteration) => {
    return axios.get(API_URL + "demogr/cards", { headers: authHeader(), params: { idIteration: idIteration }  });
};

const DashboardIterationService = {
    getCardsContentGeneral,
    getTableTimeContentGeneral,
    getPieChartContentGeneral,
    getBarChartContentGeneral,
    getCardsContentDemogr,
};

export default DashboardIterationService;