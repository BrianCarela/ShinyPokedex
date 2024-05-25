import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = () => {
  const [data, setData] = useState<any>(null);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const customFetch = async () => {
    try {
      const payload = await axios.get(url);
      setData(payload.data);
      setLoading(false);
      setError(null);
    } catch (e: any) {
      if (e.response?.status === 404) {
        setError("Data not found");
        setData(null);
        setLoading(false);
      } else {
        setError(e.message);
        setData(null);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (loading) {
      customFetch();
    }
  }, [loading, url]);

  return [setUrl, data, loading, setLoading, error] as const;
};

export default useAxios;
