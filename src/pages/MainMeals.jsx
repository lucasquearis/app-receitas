import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, RecipeList, Footer } from '../components';

function MainMeals() {
  const recipes = useSelector(({ meals }) => meals.recipes);
  if (recipes.meals && recipes.meals.length === 1) {
    const mealId = recipes.meals[0].idMeal;
    return <Redirect to={ `/comidas/${mealId}` } />;
  }
  return (
    <div>
      <Header title="Comidas" searchIcon />
      <RecipeList />
      <Footer />
    </div>
  );
}

export default MainMeals;
