import { useState, useEffect } from 'react';

type FetchType = {
    // eslint-disable-next-line
    data: any,
    loading: boolean,
    error: string | null
}

export const useFetch = <T>(
    url: string, 
    method: string, 
    headers?: Record<string, string>, 
    body?: unknown
) : FetchType => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); 

            try {
                const response = await fetch(url, {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : undefined, 
                });

                if (!response.ok) {
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
    }, [url, method, headers, body]);

    return { data, loading, error };
};
