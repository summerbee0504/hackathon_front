import { useState, useEffect } from 'react';

export const useGetRequest = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const request = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, request);
        const json = await response.json();
        setData(json);
        console.log(json);
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
