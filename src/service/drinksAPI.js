import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinksAPI() {
  const { setDrinkData } = useContext(RecipesContext);
  const endArray = 12;
  useEffect(() => {
    const response = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      await fetch(url).then((packJason) => packJason.json())
        .then(({ drinks }) => setDrinkData(drinks.slice(0, endArray)));
    };
    response();
  }, [setDrinkData]);
}

export default DrinksAPI;
