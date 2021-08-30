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
<<<<<<< HEAD
=======
      <p>Recipe List</p>
>>>>>>> 2729d5f85e620986b905c793f7bf49cc7d96412a
      <Footer />
    </div>
  );
}

export default RecipeList;
