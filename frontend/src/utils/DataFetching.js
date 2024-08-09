import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
const URL = process.env.BACKEND_URL;

export function useFetchData(url, token) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { axiosInstance } = useAxios(token);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error);
        } else {
          setError(new AxiosError("An unexpected error occurred"));
        }
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url, axiosInstance]);
  return { data, loading, error };
}
export function useAxios(token) {
  const axiosInstance = axios.create({
    baseURL: `${URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { axiosInstance };
}
