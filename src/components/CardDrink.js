import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipesList.css';
import { Link } from 'react-router-dom';

function CardDrink(props) {
  const { drink, i } = props;
  return (
    <Link to={ `bebidas/${drink.idDrink}` }>
      <div data-testid={ `${i}-recipe-card` }>
        <img
          src={ `${drink.strDrinkThumb}` }
          alt="Imagem da Receita"
          data-testid={ `${i}-card-img` }
          className="drink-img"
        />
        <h4 data-testid={ `${i}-card-name` }>{drink.strDrink}</h4>
      </div>
    </Link>
  );
}

CardDrink.propTypes = {
  drink: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};

export default CardDrink;
