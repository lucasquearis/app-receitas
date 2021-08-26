import React from 'react';
import { useSelector } from 'react-redux';

function RecipesCard() {
  const foodsEl = useSelector((state) => state.search);
  console.log(foodsEl);
  return (
    <div>
      oi
    </div>
  );
}

export default RecipesCard;
