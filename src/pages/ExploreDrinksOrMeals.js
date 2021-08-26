import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function ExploreDrinksOrMeals(title) {
  const history = useHistory();
  const URL = history.location.pathname;
  if (URL === '/explorar/bebidas') {
    title = 'Explorar Bebidas';
  } if (URL === '/explorar/comidas') {
    title = 'Explorar Comidas';
  }
  return (
    <div>
      <Header title={ title } hideSearch />
      <p>Explore Drinks or Meals</p>
    </div>
  );
}

export default ExploreDrinksOrMeals;
