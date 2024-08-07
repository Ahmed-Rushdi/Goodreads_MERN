import axios, { AxiosError, AxiosInstance } from "axios";
import { useState, useEffect } from "react";
const URL = process.env.BACKEND_URL;

interface UseFetchDataState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

export function useFetchData<T>(
  url: string,
  token: string
): UseFetchDataState<T[]> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
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
export function useAxios(token: string): { axiosInstance: AxiosInstance } {
  const axiosInstance = axios.create({
    baseURL: `${URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { axiosInstance };
}
