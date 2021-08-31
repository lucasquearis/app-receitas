import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import ExploreIngredientsMealCard from './ExploreIngredientsMealCard';
import { useFetchIngredientsApiMeals } from '../customHooks/useFetchIngredientsApi';

export default function ExploreIngredientsMealsCards() {
  const { dataExploreIngredientsMeals, loading } = useContext(Context);
  const [getIngredientsMealsApi] = useFetchIngredientsApiMeals();

  const DOZE = 12;

  useEffect(() => { getIngredientsMealsApi(); }, []);

  if (loading === true) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      { dataExploreIngredientsMeals ? (
        dataExploreIngredientsMeals
          .filter((_item, index) => index < DOZE)
          .map((ingredient, index) => (
            <ExploreIngredientsMealCard
              key={ ingredient.idIngredient }
              ingredient={ ingredient }
              index={ index }
            />
          ))
      ) : null }
    </ul>
  );
}
