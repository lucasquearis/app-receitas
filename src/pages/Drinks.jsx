import React from 'react';
import DrinksCards from '../components/DrinksCards';
import DrinkCategoryButtons from '../components/DrinkCategoryButtons';

export default function Drinks() {
  return (
    <div>
      <DrinkCategoryButtons />
      <DrinksCards />
    </div>
  );
}
