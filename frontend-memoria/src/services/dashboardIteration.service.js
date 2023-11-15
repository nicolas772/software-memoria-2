import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/";

//DASHBOARD GENERAL ESTUDIO

const getCardsContentGeneral = (idIteration) => {
    return axios.get(API_URL + "iteration/general/cards", { headers: authHeader(), params: { idIteration: idIteration }  });
};

/*const getBarListContentGeneral = (idStudy) => {
    return axios.get(API_URL + "study/general/bar-list", { headers: authHeader(), params: { idStudy: idStudy }  });

}

const getBarChartContentGeneral = (idStudy) => {
    return axios.get(API_URL + "study/general/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const getTableTimeContentGeneral = (idStudy) => {
    return axios.get(API_URL + "study/general/table-time", { headers: authHeader(), params: { idStudy: idStudy }  });
}*/

const DashboardStudyService = {
    getCardsContentGeneral,
    /*getBarListContentGeneral,
    getBarChartContentGeneral,
    getTableTimeContentGeneral*/
};

export default DashboardStudyService;