import axios from "axios";
const URL = "http://0.0.0.0:3000";

export const axiosInstance = axios.create({
  baseURL: `${URL}`,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});
