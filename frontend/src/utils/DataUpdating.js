import { axiosInstance } from "./AxiosInstance";
import { AxiosError, isAxiosError } from "axios";
async function putData(url, data) {
  let loading = true;
  let error = null;
  let resData = null;
  try {
    const response = await axiosInstance.put(url, data);
    resData = response?.data;
  } catch (e) {
    if (isAxiosError(e)) {
      error = e;
    } else {
      error = new AxiosError("An unexpected error occurred");
    }
  } finally {
    loading = false;
  }
  return { resData, loading, error };
}

export default putData;
