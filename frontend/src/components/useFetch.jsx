import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont  = new AbortController();

        setTimeout(() => {

            fetch (url, {signal: abortCont.signal})
            .then (res => {
                if (!res.ok) {
                    throw new Error ("Couldn't fetch data from the JSON file");
                }
                return res.json();
            })
            .then (data => {
                setData(data);
                setIsLoading(false);
                setError(null)
            })
            .catch (err => {
              if (err.message === 'AbortError') {
                console.log('Fetch Aborted');
              } else {
                setIsLoading(false)
                setError(err.message)
              }
            })

        }, 1000);

    }, [url])

    return {data, isLoading, error}
}
 
export default useFetch;
