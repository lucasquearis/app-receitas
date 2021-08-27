import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RecipeList(title) {
  const history = useHistory();
  const URL = history.location.pathname;
  if (URL === '/comidas') {
    title = 'Comidas';
  }
  if (URL === '/bebidas') {
    title = 'Bebidas';
  }
  return (
    <div>
      <Header title={ title } />
      <p>Recipe List</p>
      <Footer />
    </div>
  );
}

export default RecipeList;
