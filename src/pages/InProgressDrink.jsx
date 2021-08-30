import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Footer from '../components/Footer';
import InProgress from '../components/InProgress';
import { fetchDrinksDetails } from '../services/fechRecipes';

export default function InProgressMeal(props) {
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState({});
  useEffect(() => {
    fetchDrinksDetails(setDetails, id);
  }, []);
  if (!details.drinks) { return <div>Loading...</div>; }
  const filterIngredients = Object.entries(details.drinks[0])
    .filter((item) => item[0].includes('Ingredient'))
    .map((item) => item[1])
    .filter((item) => item !== '' && item !== null && item !== ' ');

  const filterMeasure = Object.entries(details.drinks[0])
    .filter((item) => item[0].includes('Measure'))
    .map((item) => item[1])
    .filter((item) => item !== ' ' && item !== null && item !== '');
  const ingredientAndMeasure = [[...filterIngredients], [...filterMeasure]];

  const strIngredients = Object.entries(details.drinks[0])
    .filter(([key, value]) => key.includes('strIngredient') && value);
  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = details.drinks[0];
  return (
    <div>
      <InProgress
        drink={ strDrink }
        thumb={ strDrinkThumb }
        alcoholic={ strAlcoholic }
        category={ strCategory }
        instructions={ strInstructions }
        ingredientAndMeasure={ ingredientAndMeasure }
        ingredients={ strIngredients }
        id={ id }
        type="drinks"
      />
    </div>
  );
}

InProgressMeal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
