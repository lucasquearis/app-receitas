import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ExploreByIngredients() {
  const dispatch = useDispatch();
  const exploreLimits = 12;

  return (
    <div
      data-testid="${index}-ingredient-card"
      data-testid="${index}-card-img"
      data-testid="${index}-card-name"
    >
      hi
    </div>
  );
}

export default ExploreByIngredients;
