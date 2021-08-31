import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function DrinkCard({ drink, index }) {
  const { strDrink, strDrinkThumb, idDrink } = drink;
  return (
    <Link to={ { pathname: `/comidas/${idDrink}`, id: idDrink } }>
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ strDrinkThumb }
          alt="Imagem da Bebida"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
      </div>
    </Link>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    idDrink: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
