import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinksAPI(request) {
  const { setDrinkData, setDrinkCategory } = useContext(RecipesContext);
  const numberDrinks = 12;
  const numberCategory = 5;
  useEffect(() => {
    const response = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/${request}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ drinks }) => {
          if (request === 'search.php?s=') {
            setDrinkData(drinks.slice(0, numberDrinks));
          } else setDrinkCategory(drinks.slice(0, numberCategory));
        });
    };
    response();
  }, [setDrinkData, setDrinkCategory]);
}

export default DrinksAPI;
