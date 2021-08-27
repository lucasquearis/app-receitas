import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinksAPI() {
  const empthRequest = 'search.php?s=';
  const {
    setDrinkData,
    setDrinkCategory,
    drinkCategory,
    food } = useContext(RecipesContext);
  const numberCategory = 5;
  useEffect(() => {
    const response = async (request) => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/${request}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ drinks }) => {
          if (request === empthRequest) {
            setDrinkData(drinks);
          } else setDrinkCategory(drinks.slice(0, numberCategory));
        });
    };
    if (!food) {
      if (drinkCategory.length) {
        const ent = empthRequest;
        response(ent);
      } else {
        response(empthRequest);
        response('list.php?c=list');
      }
    }
  }, [setDrinkData, setDrinkCategory, drinkCategory, food]);
}

export default DrinksAPI;
