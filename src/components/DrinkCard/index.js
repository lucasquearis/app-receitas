import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './style.css';

const DrinkCard = ({ drink, index }) => {
  const { strDrinkThumb, strDrink, idDrink } = drink;
  const history = useHistory();

  return (
    <div
      className="drink-card"
      aria-hidden="true"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/bebidas/${idDrink}`) }
    >
      <img
        src={ strDrinkThumb }
        alt="Imagem da Bebida"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
    </div>
  );
};

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
