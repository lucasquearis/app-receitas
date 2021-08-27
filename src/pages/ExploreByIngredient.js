import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreByIngredient(title) {
  const history = useHistory();
  const URL = history.location.pathname;
  if (URL === '/explorar/bebidas/ingredientes'
|| URL === '/explorar/comidas/ingredientes') {
    title = 'Explorar Ingredientes';
  }
  return (
    <div>
      <Header title={ title } hideSearch />
      <p>Explore by Ingredient</p>
      <p>Explore by Ingredient</p>
      <Footer />
    </div>
  );
}

export default ExploreByIngredient;
