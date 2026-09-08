import { useEffect, useState } from "react";


const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<null | T>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                        signal: controller.signal
                    }
                );

                if (!response.ok) {
                    throw new Error(`Http error: ${response.status}`);
                }
                const data: T = await response.json();

                setData(data);

            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Неизвестная ошибка');
                }
            } finally {
                setIsLoading(false);
            }      
        }
        loadData();

        return () => {
            controller.abort();
        }
    }, [url]);

    return {
        data,
        isLoading,
        error
    }
};

export default useFetch;