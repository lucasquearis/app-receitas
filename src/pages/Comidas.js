import React, { useContext, useState } from 'react';
import FoodDAPI from '../service/foodAPI';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  const { foodCategory } = useContext(RecipesContext);
  FoodDAPI();
  const [food] = useState(true);
  if (foodCategory.length > 0) {
    return (
      <div>
        <Header title="Comidas" />
        <Buttons food={ food } />
        <Recipes food={ food } />
        <Footer />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Comidas;
