import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/dashboard/";

//DASHBOARD PRINCIPAL

const getCardsContentPrincipal = () => {
  return axios.get(API_URL + "main/cards", { headers: authHeader() });
};

const DashboardService = {
  getCardsContentPrincipal,
};

export default DashboardService;