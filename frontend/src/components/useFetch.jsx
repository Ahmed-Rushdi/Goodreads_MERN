import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async () => {
            try {
                const res = await fetch(url, { signal: abortCont.signal, ...options });
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
                    setError(err); // Ensure we pass the entire error object
                }
            }
        };

        fetchData();

        return () => abortCont.abort();

    }, [url, JSON.stringify(options)]);

    return { data, isLoading, error };
};

export default useFetch;
