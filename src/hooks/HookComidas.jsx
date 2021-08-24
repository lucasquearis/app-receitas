import { useEffect, useState } from 'react';
import fetchFoods from '../fetchs/FetchFood';

function HookComidas() {
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(data);

  useEffect(() => {
    const setFetchFood = async () => {
      setLoading(true);
      const result = await fetchFoods('food', 'procuraComida');
      setFood(result);
      setLoading(false);
    };
    setFetchFood();
  }, []);

  return [food, loading];
}

export default HookComidas;
