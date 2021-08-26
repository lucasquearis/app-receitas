import { useEffect, useState } from 'react';

function useFetch(url = '', options = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url, options)
      .then((res) => res.json())
      .then((objData) => {
        if (isMounted) {
          setData(objData);
          setError(null);
        }
      })
      .catch((objError) => {
        if (isMounted) {
          setError(objError);
          setData(null);
        }
      })
      .finally(() => isMounted && setLoading(false));
    isMounted = false;
    return () => (isMounted);
  }, [url, options]);
  return { loading, error, data };
}

export default useFetch;
