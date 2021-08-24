import React, { useContext } from 'react';
import Context from '../context/Context';
import CategoryButton from './CategoryButton';

export default function MealCategoryButtons() {
  const { categoryMeals } = useContext(Context);
  const { meals } = categoryMeals;
  const CINCO = 5;

  return (
    <ul>
      { meals ? (
        meals
          .filter((_item, index) => index < CINCO)
          .map((category) => (
            <CategoryButton
              key={ category.strCategory }
              category={ category.strCategory }
            />
          ))
      ) : null }
    </ul>
  );
}
