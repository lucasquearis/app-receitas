import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodDAPI() {
  const { setFoodData, setFoodCategory } = useContext(RecipesContext);
  const numberCategory = 5;
  useEffect(() => {
    const response = async (request) => {
      const url = `https://www.themealdb.com/api/json/v1/1/${request}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ meals }) => {
          if (request === 'search.php?s=') {
            setFoodData(meals);
          } else setFoodCategory(meals.slice(0, numberCategory));
        });
    };
    response('list.php?c=list');
    response('search.php?s=');
  }, [setFoodData, setFoodCategory]);
}

export default FoodDAPI;
