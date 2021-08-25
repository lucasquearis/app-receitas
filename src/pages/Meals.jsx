import React from 'react';
import MealsCards from '../components/MealsCards';
import MealCategoryButtons from '../components/MealCategoryButtons';

export default function Meals() {
  return (
    <div>
      <MealCategoryButtons />
      <MealsCards />
    </div>
  );
}
