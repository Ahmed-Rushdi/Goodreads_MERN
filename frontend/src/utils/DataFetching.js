import { AxiosError, isAxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../utils/AxiosInstance";
export function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url);
      setData(response.data);
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
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
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
