import React, { useContext, useEffect } from 'react';

import RecipesContext from '../context/RecipesContext';
import HeaderSearch from '../components/HeaderSearch';
import Footer from '../components/Footer';

import Cards from '../components/Cards';

function Drinks() {
  const min = 0;
  const max = 12;
  const { API: { drinks, searchDrinks } } = useContext(RecipesContext);
  useEffect(() => { if (drinks.drinks.length === 0) searchDrinks(); });
  return (
    <div>
      <HeaderSearch title="Bebidas" />
      <Cards type="Drink" list={ drinks.drinks.slice(min, max) } />
      <Footer />
    </div>
  );
}

export default Drinks;
