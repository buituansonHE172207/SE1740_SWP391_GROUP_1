import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
});

export const TOKEN = "token";

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    const auth = token ? `Bearer ${token}` : "";
    console.log("auth: ", auth);
    
    if (auth) {
      config.headers.Authorization = auth;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
