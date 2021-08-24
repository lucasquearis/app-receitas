import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from '../components';

function MainMeals() {
  const recipes = useSelector(({ meals }) => meals.recipes);
  const history = useHistory();
  useEffect(() => {
    if (recipes.meals && recipes.meals.length === 1) {
      const mealId = recipes.meals[0].idMeal;
      history.push(`/comidas/${mealId}`);
    }
  }, [recipes]);
  return (
    <div>
      <Header title="Comidas" searchIcon />
    </div>
  );
}

export default MainMeals;
