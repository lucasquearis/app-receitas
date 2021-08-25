import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodFilterDAPI() {
  const { setDrinkData, filter } = useContext(RecipesContext);
  useEffect(() => {
    const response = async (filterError) => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterError}`;
      await fetch(url).then((packJason) => packJason.json())
        .then(({ drinks }) => {
          setDrinkData(drinks);
        });
    };
    const newFilter = filter === 'Ordinary Drink' ? filter.replace(' ', '_') : filter;
    response(newFilter);
  }, [setDrinkData, filter]);
}

export default FoodFilterDAPI;
