import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Footer from '../components/Footer';
import InProgress from '../components/InProgress';
import { fetchFoodDetails } from '../services/fechRecipes';

export default function InProgressMeal(props) {
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState({});
  useEffect(() => {
    fetchFoodDetails(setDetails, id);
  }, []);
  if (!details.meals) { return <div>Loading...</div>; }
  const strIngredients = Object.entries(details.meals[0])
    .filter(([key, value]) => key.includes('strIngredient') && value);
  const filterIngredients = Object.entries(details.meals[0])
    .filter((item) => item[0].includes('Ingredient'))
    .map((item) => item[1]).filter((item) => item !== '' && item !== null);
  const filterMeasure = Object.entries(details.meals[0])
    .filter((item) => item[0].includes('Measure'))
    .map((item) => item[1]).filter((item) => item !== '' && item !== null);
  const ingredientAndMeasure = [[...filterIngredients], [...filterMeasure]];

  const { strMeal, strMealThumb, strCategory,
    strInstructions, strYoutube, strArea } = details.meals[0];
  return (
    <div>
      <InProgress
        meal={ strMeal }
        thumb={ strMealThumb }
        category={ strCategory }
        ingredients={ strIngredients }
        instructions={ strInstructions }
        youTube={ strYoutube }
        area={ strArea }
        ingredientAndMeasure={ ingredientAndMeasure }
        id={ id }
        type="meals"
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
