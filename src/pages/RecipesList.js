import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

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
    </div>
  );
}

export default RecipeList;
