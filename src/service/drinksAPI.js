import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinksAPI() {
  const { setDrinkData,
    setDrinkCategory,
    filter,
    drinkCategory } = useContext(RecipesContext);
  const numberCategory = 5;
  useEffect(() => {
    const response = async (request) => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/${request}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ drinks }) => {
          if (request === `search.php?s=${filter}`) {
            setDrinkData(drinks);
          } else setDrinkCategory(drinks.slice(0, numberCategory));
        });
    };
    if (drinkCategory.length) {
      const ent = `search.php?s=${filter}`;
      response(ent);
    } else {
      response('search.php?s=');
      response('list.php?c=list');
    }
  }, [setDrinkData, setDrinkCategory, filter, drinkCategory]);
}

export default DrinksAPI;
