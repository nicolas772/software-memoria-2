import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getTesterBoard = () => {
  return axios.get(API_URL + "tester", { headers: authHeader() });
};

const getTestingUserBoard = () => {
  return axios.get(API_URL + "testinguser", { headers: authHeader() });
};


const userService = {
  getPublicContent,
  getTesterBoard,
  getTestingUserBoard
};

export default userService