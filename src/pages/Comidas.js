import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import DrinksAPI from '../service/drinksAPI';
import FoodDAPI from '../service/foodAPI';

function Comidas() {
  const { foodData, drinkData, drinkCategory, foodCategory } = useContext(RecipesContext);
  FoodDAPI('list.php?c=list');
  FoodDAPI('search.php?s=');
  DrinksAPI('list.php?c=list');
  DrinksAPI('search.php?s=');
  return (
    <div>
      comidas!
    </div>
  );
}

export default Comidas;
