import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, RecipeList, Footer, CategoryFilter } from '../components';
import UseInitialRecipes from '../hook/UseInitialRecipes';

function MainMeals() {
  const filter = useSelector(({ meals }) => meals.filter);
  if (filter !== 'explore') {
    UseInitialRecipes('meals');
  }
  const recipes = useSelector(({ meals }) => meals.recipes);
  if (recipes.meals && recipes.meals.length === 1 && filter === 'searchBar') {
    const mealId = recipes.meals[0].idMeal;
    return <Redirect to={ `/comidas/${mealId}` } />;
  }
  return (
    <div>
      <Header title="Comidas" searchIcon />
      <CategoryFilter />
      <RecipeList />
      <Footer />
    </div>
  );
}

export default MainMeals;
