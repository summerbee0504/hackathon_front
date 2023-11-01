import { useState } from 'react';

export const usePostRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const makePostRequest = (url: string, postdata: string) => {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: postdata
    };

    const fetchData = async () => {
      try {
        setLoading(true);
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
  };
  return { data, loading, error, makePostRequest };
};
