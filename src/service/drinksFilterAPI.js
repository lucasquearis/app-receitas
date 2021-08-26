import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodFilterDAPI() {
  const { setDrinkData, filter, search } = useContext(RecipesContext);
  useEffect(() => {
    const response = async () => {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
      if (search === 'nome') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`;
      } else if (search === 'ingrediente') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`;
      } else if (search === 'primeira letra') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter}`;
      }
      await fetch(url).then((packJason) => packJason.json())
        .then(({ drinks }) => {
          setDrinkData(drinks);
        });
    };
    response();
  }, [setDrinkData, filter, search]);
}

export default FoodFilterDAPI;
