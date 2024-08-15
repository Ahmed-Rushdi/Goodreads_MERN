import axios, { AxiosError } from "axios";
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
  }, [url]);
  return { data, loading, error };
}

 

