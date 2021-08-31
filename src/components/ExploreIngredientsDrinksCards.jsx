import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import ExploreIngredientsDrinkCard from './ExploreIngredientsDrinkCard';
import { useFetchIngredientsApiDrinks } from '../customHooks/useFetchIngredientsApi';

export default function ExploreIngredientsDrinksCards() {
  const { dataExploreIngredientsDrinks, loading } = useContext(Context);
  const [getIngredientsDrinksApi] = useFetchIngredientsApiDrinks();

  const DOZE = 12;

  useEffect(() => { getIngredientsDrinksApi(); }, []);

  if (loading === true) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      { dataExploreIngredientsDrinks ? (
        dataExploreIngredientsDrinks
          .filter((_item, index) => index < DOZE)
          .map((ingredient, index) => (
            <ExploreIngredientsDrinkCard
              key={ ingredient.idIngredient }
              ingredient={ ingredient }
              index={ index }
            />
          ))
      ) : null }
    </ul>
  );
}
