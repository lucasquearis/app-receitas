import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import HeaderDetails from './HeaderDetails';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

export default function HeaderIngredientsInstructions() {
  const { recipeDetails } = useContext(AppContext);
  const index = 0;

  return (
    <section>
      <HeaderDetails
        id={ recipeDetails && (recipeDetails.idMeal || recipeDetails.idDrink) }
        name={ recipeDetails && (recipeDetails.strMeal || recipeDetails.strDrink) }
        img={ recipeDetails
          && (recipeDetails.strMealThumb || recipeDetails.strDrinkThumb) }
        aux={ recipeDetails && (recipeDetails.strCategory) }
        area={ recipeDetails && (recipeDetails.strArea) }
        alcoholic={ recipeDetails && (recipeDetails.strAlcoholic) }
      />
      <Ingredients ingredients={ recipeDetails } index={ index } />
      <Instructions instructions={ recipeDetails && (recipeDetails.strInstructions) } />
    </section>
  );
}
