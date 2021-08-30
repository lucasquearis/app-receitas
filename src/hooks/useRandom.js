import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useRandom = () => {
  const [id, setId] = useState('');
  const { pathname } = useLocation();
  const foodApi = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const drinkApi = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  useEffect(() => {
    if (pathname === '/explorar/comidas') {
      const generateId = async () => {
        const randomRecipe = await fetch(foodApi).then((response) => response.json());
        setId(randomRecipe.meals[0].idMeal);
        console.log(randomRecipe.meals[0].idMeal);
      };
      generateId();
    }
    if (pathname === '/explorar/bebidas') {
      const generateId = async () => {
        const randomRecipe = await fetch(drinkApi)
          .then((response) => response.json());
        setId(randomRecipe.drinks[0].idDrink);
        console.log(randomRecipe.drinks[0].idDrink);
      };
      generateId();
    }
  }, [pathname, setId]);

  return [id, setId];
};

export default useRandom;
