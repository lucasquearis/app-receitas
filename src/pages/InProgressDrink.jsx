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
  const strIngredients = Object.entries(details.drinks[0])
    .filter(([key, value]) => key.includes('strIngredient') && value);
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = details.drinks[0];
  return (
    <div>
      <InProgress
        name={ strDrink }
        img={ strDrinkThumb }
        category={ strAlcoholic }
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
