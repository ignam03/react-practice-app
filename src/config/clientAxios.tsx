import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const clientAxios = axios.create({
  baseURL: BASE_URL,
  // baseURL: process.env.REACT_BACKEND_URL
});

export default clientAxios;
