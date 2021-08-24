import React, { useContext } from 'react';
import Context from '../context/Context';
import MealCard from './components/MealCard';

export default function Meals() {
  const { dataMeals } = useContext(Context);
  console.log(dataMeals);

  return (
    <div>
      <MealCard meals={ dataMeals } />
    </div>
  );
}
