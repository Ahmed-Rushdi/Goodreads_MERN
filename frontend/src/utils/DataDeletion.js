import axios, { AxiosError } from "axios";
import { axiosInstance } from "../utils/AxiosInstance";
export async function delData(url) {
  let loading = true;
  let error = null;
  let data = null;

  try {
    const response = await axiosInstance.delete(url);
    data = response?.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error = e;
    } else {
      error = new AxiosError("An unexpected error occurred");
    }
  } finally {
    loading = false;
  }

  if (!data && !error) {
    throw new Error("No data or error was returned");
  }

  return { data, loading, error };
}
