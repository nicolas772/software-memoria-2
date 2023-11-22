import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/study/";

//DASHBOARD GENERAL ESTUDIO

const getCardsContentGeneral = (idStudy) => {
    return axios.get(API_URL + "general/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getBarListContentGeneral = (idStudy) => {
    return axios.get(API_URL + "general/bar-list", { headers: authHeader(), params: { idStudy: idStudy }  });

}

const getBarChartContentGeneral = (idStudy) => {
    return axios.get(API_URL + "general/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const getTableTimeContentGeneral = (idStudy) => {
    return axios.get(API_URL + "general/table-time", { headers: authHeader(), params: { idStudy: idStudy }  });
}

//DASHBOARD DEMOGRÁFICO ESTUDIO

const getCardsContentDemogr = (idStudy) => {
    return axios.get(API_URL + "demogr/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getPieChartContentDemogr = (idStudy) => {
    return axios.get(API_URL + "demogr/pie-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const getBarChartContentDemogr = (idStudy) => {
    return axios.get(API_URL + "demogr/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

const getStackedChartContentDemogr = (idStudy) => {
    return axios.get(API_URL + "demogr/stacked-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
}

//DASHBOARD USABILITY ESTUDIO

const getCardsContentUsability = (idStudy) => {
    return axios.get(API_URL + "usability/cards", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getBoxPlotContentUsability = (idStudy) => {
    return axios.get(API_URL + "usability/box-plot", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const getBarChartContentUsability = (idStudy) => {
    return axios.get(API_URL + "usability/bar-chart", { headers: authHeader(), params: { idStudy: idStudy }  });
};

const DashboardStudyService = {
    getCardsContentGeneral,
    getBarListContentGeneral,
    getBarChartContentGeneral,
    getTableTimeContentGeneral,
    getCardsContentDemogr,
    getPieChartContentDemogr,
    getBarChartContentDemogr,
    getStackedChartContentDemogr,
    getCardsContentUsability,
    getBoxPlotContentUsability,
    getBarChartContentUsability,
};

export default DashboardStudyService;