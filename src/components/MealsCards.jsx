import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import MealCard from './MealCard';
import { useFetchApiMeals } from '../customHooks/useFetchApi';

export default function MealsCard() {
  const { dataMeals } = useContext(Context);
  const [getMealsApi] = useFetchApiMeals();
  const DOZE = 12;

  useEffect(() => { getMealsApi(); }, []);

  return (
    <ul>
      { dataMeals ? (
        dataMeals
          .filter((_item, index) => index < DOZE)
          .map((meal, index) => (
            <MealCard
              key={ meal.idMeal }
              meal={ meal }
              index={ index }
            />
          ))
      ) : null }
    </ul>
  );
}
