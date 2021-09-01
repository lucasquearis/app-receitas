import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import HeaderDetails from './HeaderDetails';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import IngredientsInProgress from './IngredientsInProgress';

export default function HeaderIngredientsInstructions({ pathnameAPI, id }) {
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
      {
        (pathnameAPI && id)
          ? (
            <IngredientsInProgress
              ingredients={ recipeDetails }
              pathnameAPI={ pathnameAPI }
              id={ id }
            />
          )
          : <Ingredients ingredients={ recipeDetails } index={ index } />
      }
      <Instructions instructions={ recipeDetails && (recipeDetails.strInstructions) } />
    </section>
  );
}

HeaderIngredientsInstructions.defaultProps = {
  pathnameAPI: null,
  id: null,
};

HeaderIngredientsInstructions.propTypes = {
  pathnameAPI: PropTypes.string,
  id: PropTypes.string,
};
