import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodFilterDAPI() {
  const { setDrinkData, filter } = useContext(RecipesContext);
  useEffect(() => {
    const response = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ drinks }) => {
          setDrinkData(drinks);
        });
    };
    response();
  }, [setDrinkData, filter]);
}

export default FoodFilterDAPI;
