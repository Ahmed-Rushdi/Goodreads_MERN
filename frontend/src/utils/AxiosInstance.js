import axios from "axios";
const URL = "https://goodreadsmern-production.up.railway.app";

export const axiosInstance = axios.create({
  baseURL: `${URL}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace 'token' with your key
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

