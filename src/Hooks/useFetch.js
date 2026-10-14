
import { useState, useEffect } from "react";

export default function useFetch(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tick,setTick] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    setLoading(true);  
    setError(null);
    

    fn()
      .then((res) => {
        if (isCurrent) {
          setData(res);
        }
      })
      .catch((err) => {
        if (isCurrent) {
  
          setError(err);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [...deps, tick]);

  return { data, loading, error, retry: () => setTick((t) => t+1) };
}
