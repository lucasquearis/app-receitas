import { useEffect, useState } from 'react';
import fetchFoods from '../fetchs/FetchFood';

function HookComidas() {
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState({});
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const setFetchFood = async () => {
      setLoading(true);
      const result = await fetchFoods('food', 'procuraComida');
      setFood(result);
      const newCategories = await fetchFoods('food', 'categories');
      setCategories(newCategories);
      setLoading(false);
    };
    setFetchFood();
  }, []);

  return [food, loading, categories, setLoading];
}

export default HookComidas;
