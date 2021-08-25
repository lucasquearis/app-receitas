import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodFilterDAPI() {
  const { setFoodData, filter } = useContext(RecipesContext);
  useEffect(() => {
    const response = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ meals }) => {
          setFoodData(meals);
        });
    };
    response();
  }, [setFoodData, filter]);
}

export default FoodFilterDAPI;
