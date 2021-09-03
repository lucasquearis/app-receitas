import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryFood from '../components/CategoryFood';
import CategoryDrink from '../components/CategoryDrink';
import HeaderSearchBar from '../components/HeaderSearchBar';
import IngredientRecipes from '../components/IngredientRecipes';
import MainContext from '../context/MainContext';

function RecipeList(title) {
  const history = useHistory();
  const URL = history.location.pathname;
  const { renderCF, renderCD } = useContext(MainContext);

  if (URL === '/comidas') {
    title = 'Comidas';
  } else if (URL === '/bebidas') {
    title = 'Bebidas';
  }

  const verifyCategories = () => {
    if (title === 'Comidas' && renderCF) {
      return <CategoryFood />;
    } if (title === 'Bebidas' && renderCD) {
      return <CategoryDrink />;
    }
    return null;
  };

  return (
    <div>
      <Header title={ title } />
      <IngredientRecipes />
      <HeaderSearchBar />
      { verifyCategories() }
      {/* {(title === 'Comidas' ? <CategoryFood /> : <CategoryDrink />)} */}
      <Footer />
    </div>
  );
}

export default RecipeList;
