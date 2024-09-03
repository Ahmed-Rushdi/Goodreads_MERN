import axios from "axios";
const URL = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: `${URL}`,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});
