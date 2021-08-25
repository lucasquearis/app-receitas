import React, { useContext } from 'react';
import Context from '../context/Context';
import MealCard from './MealCard';

export default function Meals() {
  const { dataMeals } = useContext(Context);
  const DOZE = 12;

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
