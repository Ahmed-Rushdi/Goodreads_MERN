import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(url, options);
            if (!res.ok) {
                const errorText = await res.text();
                console.error(`Error ${res.status}: ${errorText}`);
                throw new Error(`Error ${res.status}: ${errorText}`);
            }
            const data = await res.json();
            setData(data);
            setIsLoading(false);
        } catch (err) {
            if (err.name !== "AbortError") {
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
