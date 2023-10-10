import axios from "axios";
import { URL_CONFIG } from "../config/url.config";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
});

export const TOKEN = "token";

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    const auth = token ? `Bearer ${token}` : "";
    if (auth) {
      config.headers.Authorization = auth;
    }
    return config;
  },
  (error) => Promise.reject(error.response.data)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const { response } = error;
    if (response) {
      const { data, status } = response;
      if (status === 401) {
        window.location.href = URL_CONFIG.LOGIN;
        localStorage.removeItem(TOKEN);
      }
      return Promise.reject({ status, data });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
