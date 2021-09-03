import { useEffect, useState } from 'react';
import mainFetch from '../fetchs/mainFetch';

function HookComidas() {
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState({});
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const setFetchFood = async () => {
      setLoading(true);
      const result = await mainFetch('food', 'procuraComida');
      setFood(result);
      const newCategories = await mainFetch('food', 'categories');
      setCategories(newCategories);
      setLoading(false);
    };
    setFetchFood();
  }, []);

  return [food, loading, categories, setLoading];
}

export default HookComidas;
