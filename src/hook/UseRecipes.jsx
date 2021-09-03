import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { requestDefault } from '../redux/actions/fetchActions';

const UseRecipes = () => {
  const recipes = useSelector((state) => state.meals.recipes);
  const maxItensIndexOnScreen = 11;
  const dispatch = useDispatch();

  const fetchDefault = (path) => dispatch(requestDefault(path));

  const chooser = (path) => {
    if (recipes.meals === null || recipes.drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      fetchDefault(path);
    }
    if (recipes.meals) {
      return recipes.meals.map((e, index) => index <= maxItensIndexOnScreen
       && (
         <Link key={ e.idMeal } to={ `/comidas/${e.idMeal}` }>
           <RecipeCard index={ index } recipe={ e } />
         </Link>));
    } if (recipes.drinks) {
      return recipes.drinks.map((e, index) => index <= maxItensIndexOnScreen
      && (
        <Link key={ e.idDrink } to={ `/bebidas/${e.idDrink}` }>
          <RecipeCard index={ index } recipe={ e } />
        </Link>));
    }
  };

  return { chooser };
};

export default UseRecipes;
