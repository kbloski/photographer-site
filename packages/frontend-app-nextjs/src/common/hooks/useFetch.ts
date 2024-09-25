import { useState, useEffect } from 'react';

type FetchType = {
    // eslint-disable-next-line
    data: any,
    loading: boolean,
    error: string | null,
    refresh: ()=> void
}



export const useFetch = <T>(
    url: string, 
    options  :{
        method: string, 
        headers?: Record<string, string>, 
        body?: unknown
    }
) : FetchType => {
    const [ refresh, setRefresh] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); 

            try {
                const response = await fetch(url, {
                    method: options.method,
                    headers: options.headers,
                    body: options.body ? JSON.stringify(options.body) : undefined, 
                });

                if (!response.ok) {
                    setData( null );
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [
        url, 
        options.method,
        // options.headers,
        options.body,
        refresh
    ]);

    function refreshToggle() {
        setRefresh( prev => !prev );
    } 

    return { data, loading, error, refresh: refreshToggle };
};
