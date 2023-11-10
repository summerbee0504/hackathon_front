import { useState, useEffect } from 'react';

export const useGetRequest = (url: string) => {
  const [data, setData] = useState<any>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      try {
        const response = await fetch(url, request);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
