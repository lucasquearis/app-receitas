import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodFilterDAPI() {
  const { setFoodData, filter, search } = useContext(RecipesContext);
  useEffect(() => {
    const response = async () => {
      let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
      if (search === 'nome') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`;
      } else if (search === 'ingrediente') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`;
      } else if (search === 'primeira letra') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter}`;
      }
      await fetch(url).then((packJason) => packJason.json())
        .then(({ meals }) => {
          setFoodData(meals);
        });
    };
    response();
  }, [setFoodData, filter, search]);
}

export default FoodFilterDAPI;
