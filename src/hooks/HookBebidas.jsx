import { useEffect, useState } from 'react';
import fetchFoods from '../fetchs/FetchFood';

function HookComidas() {
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState({});
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const setFetchFood = async () => {
      setLoading(true);
      const result = await fetchFoods('drink', 'procuraBebida');
      setDrink(result);
      const newCategories = await fetchFoods('drink', 'categories');
      setCategories(newCategories);
      setLoading(false);
    };
    setFetchFood();
  }, []);

  return [drink, loading, categories, setLoading];
}

export default HookComidas;
