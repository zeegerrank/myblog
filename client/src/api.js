import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3500/api",
  timeout: 6000,
  //   withCredentials: true,
});
export default api;
