import React, { useContext } from 'react';
import Context from '../context/Context';
import MealCard from '../components/MealCard';

export default function Meals() {
  const { dataMeals } = useContext(Context);
  const { meals } = dataMeals;
  const DOZE = 12;

  return (
    <ul>
      { meals ? (
        meals
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
