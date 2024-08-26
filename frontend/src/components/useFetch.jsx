import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../utils/AxiosInstance";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({
        url,
        ...options,
      });

      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setIsLoading(false);
        setError(err);
      }
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
