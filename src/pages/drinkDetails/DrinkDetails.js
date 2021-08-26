import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DrinkDetails = ({ match: { params: id } }) => {
  const [drink, setDrink] = useState(0);
  useEffect(() => {
    const fetchDrink = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id.id}`)
        .then((resolve) => resolve.json())
        .then((resolve) => setDrink(resolve.drinks[0]));
    };
    fetchDrink();
  }, [id.id]);
  console.log(drink);
  return (
    <div>oi</div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
