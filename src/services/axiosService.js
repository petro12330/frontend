import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const REACT_APP_BASE_PATH =
  process.env.REACT_APP_BASE_PATH || "http://localhost:8000/api/";
const timeout = process.env.timeout || 6000;

const instance = axios.create({
  baseURL: REACT_APP_BASE_PATH,
  timeout: timeout
});
instance.interceptors.request.use(config => {
  const { token } = useAuth();
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});
export default instance;
