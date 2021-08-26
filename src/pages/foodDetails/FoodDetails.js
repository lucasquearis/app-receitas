import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderDetails from '../../components/CardDetails/HeaderDetails';

const FoodDetails = ({ match: { params: id } }) => {
  const [meal, setMeal] = useState({});
  useEffect(() => {
    const fecthDetails = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.id}`)
        .then((response) => response.json())
        .then((response) => setMeal(response.meals[0]));
    };
    fecthDetails();
  }, [id]);
  const { strMeal, strMealThumb, strCategory } = meal;
  return (
    <div>
      <HeaderDetails image={ strMealThumb } title={ strMeal } category={ strCategory } />
    </div>
  );
};

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
