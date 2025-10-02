import { useEffect, useState } from "react";

const API_URL = "https://panel.hegoval.cl/wp-json/wp/v2";

export function useWPData(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/${endpoint}`);
        if (!res.ok) throw new Error(`Error al cargar ${endpoint}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}
