import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header, RecipeList, Footer } from '../components';

function MainDrinks() {
  const recipes = useSelector(({ meals }) => meals.recipes);
  if (recipes.drinks && recipes.drinks.length === 1) {
    const drinkId = recipes.drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${drinkId}` } />;
  }
  return (
    <div>
      <Header title="Bebidas" searchIcon />
      <RecipeList />
      <Footer />
    </div>
  );
}

export default MainDrinks;
