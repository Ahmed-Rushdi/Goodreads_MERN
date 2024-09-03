import axios from "axios";
const URL = "https://goodreadsmern-production.up.railway.app";

export const axiosInstance = axios.create({
  baseURL: `${URL}`,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});
