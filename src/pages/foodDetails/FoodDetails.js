import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const FoodDetails = ({ match: { params: id } }) => {
  const [meal, setMeal] = useState({});
  useEffect(() => {
    const fecthDetails = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.id}`)
        .then((response) => response.json())
        .then((response) => setMeal(response));
    };
    fecthDetails();
  }, [id]);
  console.log(meal);
  return (
    <div />
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
