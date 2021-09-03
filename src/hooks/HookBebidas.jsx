import { useEffect, useState } from 'react';
import mainFetch from '../fetchs/mainFetch';

function HookComidas() {
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState({});
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const setFetchFood = async () => {
      setLoading(true);
      const result = await mainFetch('drink', 'procuraBebida');
      setDrink(result);
      const newCategories = await mainFetch('drink', 'categories');
      setCategories(newCategories);
      setLoading(false);
    };
    setFetchFood();
  }, []);

  return [drink, loading, categories, setLoading];
}

export default HookComidas;
