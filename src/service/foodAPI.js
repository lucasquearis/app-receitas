import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodDAPI() {
  const { setFoodData } = useContext(RecipesContext);
  const endArray = 12;
  useEffect(() => {
    const response = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      await fetch(url).then((packJason) => packJason.json())
        .then(({ meals }) => setFoodData(meals.slice(0, endArray)));
    };
    response();
  }, [setFoodData]);
}

export default FoodDAPI;
