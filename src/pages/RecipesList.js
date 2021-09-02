import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryFood from '../components/CategoryFood';
import CategoryDrink from '../components/CategoryDrink';
import HeaderSearchBar from '../components/HeaderSearchBar';
import IngredientRecipes from '../components/IngredientRecipes';

function RecipeList(title) {
  const history = useHistory();
  const URL = history.location.pathname;

  if (URL === '/comidas') {
    title = 'Comidas';
  } else if (URL === '/bebidas') {
    title = 'Bebidas';
  }

  return (
    <div>
      <Header title={ title } />
      <HeaderSearchBar />
      {(title === 'Comidas' ? <CategoryFood /> : <CategoryDrink />)}
      <IngredientRecipes />
      <Footer />
    </div>
  );
}

export default RecipeList;
