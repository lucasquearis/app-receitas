import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, Footer } from '../components';

function MainDrinks() {
  const recipes = useSelector(({ meals }) => meals.recipes);
  if (recipes.drinks && recipes.drinks.length === 1) {
    const drinkId = recipes.drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${drinkId}` } />;
  }
  return (
    <div>
      <Header title="Bebidas" searchIcon />
      <Footer />
    </div>
  );
}

export default MainDrinks;
