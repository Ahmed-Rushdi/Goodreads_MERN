import { AxiosError, isAxiosError } from "axios";
import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/AxiosInstance";
export function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error);
        } else {
          setError(new AxiosError("An unexpected error occurred"));
        }
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);
  return { data, loading, error };
}

export async function fetchData(url) {
  let loading = true;
  let error = null;
  let data = null;
  try {
    const response = await axiosInstance.get(url);
    data = response?.data;
  } catch (e) {
    if (isAxiosError(e)) {
      error = e;
    } else {
      error = new AxiosError("An unexpected error occurred");
    }
  } finally {
    loading = false;
  }
  return { data, loading, error };
}
