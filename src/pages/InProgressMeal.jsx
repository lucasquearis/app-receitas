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
  const { strMeal, strMealThumb, strCategory, strInstructions } = details.meals[0];
  return (
    <div>
      <InProgress
        name={ strMeal }
        img={ strMealThumb }
        category={ strCategory }
        ingredients={ strIngredients }
        instructions={ strInstructions }
        id={ id }
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
