import React from 'react';
import PropTypes from 'prop-types';

const CardsList = ({ array, teste }) => {
  if (array !== undefined) {
    let type;
    if (array[0].idDrink === undefined) type = 'Meal';
    else type = 'Drink';

    let newArray;
    const maxCards = 12;
    if (array.length > maxCards) {
      newArray = array.slice(0, maxCards);
    } else {
      newArray = array;
    }

    return (
      <div>
        { newArray.map((obj, index) => (
          <div
            key={ index }
            data-testid={ `${index}-${teste}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ obj[`str${type}Thumb`] }
              alt={ obj[`str${type}`] }
            />
            <h3 data-testid={ `${index}-card-name` }>{ obj[`str${type}`] }</h3>
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
