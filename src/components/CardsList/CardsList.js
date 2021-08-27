import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CardsList = ({ array, teste }) => {
  if (array !== undefined) {
    let type;
    let path;
    if (array[0].idDrink === undefined) {
      type = 'Meal';
      path = 'comidas';
    } else {
      type = 'Drink';
      path = 'bebidas';
    }

    let newArray;
    const maxCards = 12;
    if (array.length > maxCards) {
      newArray = array.slice(0, maxCards);
    } else {
      newArray = array;
    }
    console.log(newArray);

    return (
      <div>
        { newArray.map((obj, index) => (
          <div
            key={ index }
            data-testid={ `${index}-${teste}` }
          >
            <Link to={ `/${path}/${obj[`id${type}`]}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ obj[`str${type}Thumb`] }
                alt={ obj[`str${type}`] }
              />
              <h3 data-testid={ `${index}-card-name` }>{ obj[`str${type}`] }</h3>
            </Link>
          </div>
        )) }
      </div>
    );
  }
};

CardsList.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default CardsList;
