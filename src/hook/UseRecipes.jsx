import { useSelector } from 'react-redux';
import React from 'react';
import RecipeCard from '../components/RecipeCard/RecipeCard';

const UseRecipes = () => {
  const recipes = useSelector((state) => state.meals.recipes);
  const maxItensIndexOnScreen = 11;

  const chooser = () => {
    if (recipes.meals === null || recipes.drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (recipes.meals) {
      return recipes.meals.map((e, index) => index <= maxItensIndexOnScreen
      && <RecipeCard index={ index } key={ e.idMeal } recipe={ e } />);
    } if (recipes.drinks) {
      return recipes.drinks.map((e, index) => index <= maxItensIndexOnScreen
      && <RecipeCard index={ index } key={ e.idDrink } recipe={ e } />);
    }
  };

  return { chooser };
};

export default UseRecipes;
