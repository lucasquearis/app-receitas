import React, { useContext, useState } from 'react';
import DrinksAPI from '../service/drinksAPI';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  const { drinkCategory } = useContext(RecipesContext);
  FoodDAPI();
  DrinksAPI();
  const [food] = useState(false);
  if (drinkCategory.length) {
    return (
      <div>
        <Header title="Bebidas" />
        <Buttons food={ food } />
        <Recipes food={ food } />
        <Footer />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Comidas;
