import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getTesterBoard = () => {
  return axios.get(API_URL + "tester", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getTesterBoard
};

export default UserService;