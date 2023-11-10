import { useState } from 'react';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const usePostRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const makePostRequest = async (url: string, postdata: string) => {
    const reportError = ({ message }: { message: string }) => {
      setError(message);
    };

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: postdata
    };

    setLoading(true);
    try {
      const response = await fetch(url, request);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setSuccess(true);
      return json;
    } catch (error) {
      reportError({ message: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
    return null;
  };
  return { success, loading, error, makePostRequest };
};
