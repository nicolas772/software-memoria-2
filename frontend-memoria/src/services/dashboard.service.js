import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/";

//DASHBOARD PRINCIPAL

const getCardsContentMain= () => {
  return axios.get(API_URL + "main/cards", { headers: authHeader() });
};

const getColumnChartContentMain= () => {
    return axios.get(API_URL + "main/columnChart", { headers: authHeader() });
  };

const DashboardService = {
  getCardsContentMain,
  getColumnChartContentMain,
};

export default DashboardService;