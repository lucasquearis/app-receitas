import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodDAPI(request) {
  const { setFoodData, setFoodCategory } = useContext(RecipesContext);
  const numberFoods = 12;
  const numberCategory = 5;
  useEffect(() => {
    const response = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/${request}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ meals }) => {
          if (request === 'search.php?s=') {
            setFoodData(meals.slice(0, numberFoods));
          } else setFoodCategory(meals.slice(0, numberCategory));
        });
    };
    response();
  }, [setFoodData, setFoodCategory]);
}

export default FoodDAPI;
