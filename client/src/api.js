import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "http://localhost:3500/api",
  timeout: 6000,
});
export default api;
