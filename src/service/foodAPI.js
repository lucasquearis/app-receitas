import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodDAPI() {
  const empthRequest = 'search.php?s=';
  const { setFoodData, setFoodCategory, foodCategory } = useContext(RecipesContext);
  const numberCategory = 5;
  useEffect(() => {
    const response = async (request) => {
      const url = `https://www.themealdb.com/api/json/v1/1/${request}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ meals }) => {
          if (request === empthRequest) {
            setFoodData(meals);
          } else setFoodCategory(meals.slice(0, numberCategory));
        });
    };
    if (foodCategory.length > 1) {
      response(empthRequest);
    } else {
      response(empthRequest);
      response('list.php?c=list');
    }
  }, [setFoodData, setFoodCategory, foodCategory]);
}

export default FoodDAPI;
