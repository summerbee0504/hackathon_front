import { useEffect, useState } from 'react';

export const useRequest = (url: string, postdata: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const request = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: postdata
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, request);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);
  return { data, loading, error };
};
