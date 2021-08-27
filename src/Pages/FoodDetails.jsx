import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function FoodDetails(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const { match: { params: { id } } } = props;
    const getDetails = async () => {
      const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(END_POINT);
      const { meals } = await response.json();
      setData(meals[0]);
    };
    getDetails();
  }, [data, props]);

  const { strMeal, strCategory, strArea, strMealThumb } = data;

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ strMeal }
      />
      <h1>
        Name:
        { strMeal }
      </h1>
      <p>
        Categoria:
        { strCategory }
      </p>
      <p>
        Área:
        { strArea }
      </p>
    </div>
  );
}
FoodDetails.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
};
export default FoodDetails;
