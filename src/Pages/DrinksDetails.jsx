import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function DrinksDetails(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      const { match: { params: { id } } } = props;
      const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(END_POINT);
      const { meals } = await response.json();
      setData(meals[0]);
      console.log(meals);
    };
    getDetails();
  }, [setData, props]);

  const { strDrink, strCategory, strArea, strDrinkThumb } = data;

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <h1>
        Name:
        { strDrink }
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
DrinksDetails.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
};
export default DrinksDetails;
