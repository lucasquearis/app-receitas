import React, { useContext, useEffect } from 'react';

import RecipesContext from '../context/RecipesContext';
import HeaderSearch from '../components/HeaderSearch';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

function Foods() {
  const min = 0;
  const max = 12;
  const { API: { foods, searchFoods } } = useContext(RecipesContext);
  useEffect(() => { if (foods.meals.length === 0) searchFoods(); });
  return (
    <div>
      <HeaderSearch title="Comidas" />
      <Cards type="Meal" list={ foods.meals.slice(min, max) } />
      <Footer />
    </div>
  );
}

export default Foods;
