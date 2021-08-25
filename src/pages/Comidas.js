import React, { useContext, useState } from 'react';
import DrinksAPI from '../service/drinksAPI';
import FoodDAPI from '../service/foodAPI';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

function Comidas() {
  const { drinkCategory } = useContext(RecipesContext);
  FoodDAPI();
  DrinksAPI();
  const [food] = useState(true);
  if (drinkCategory.length) {
    return (
      <div>
        <Buttons food={ food } />
        <Recipes food={ food } />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Comidas;
