import React, { useContext } from 'react';
import Context from '../context/Context';
import CategoryButton from './CategoryButton';

export default function DrinkCategoryButtons() {
  const { categoryDrinks } = useContext(Context);
  const { drinks } = categoryDrinks;
  const CINCO = 5;

  return (
    <ul>
      { drinks ? (
        drinks
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
