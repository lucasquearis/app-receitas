import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipesList.css';

function CardDrink(props) {
  const { drink, i } = props;
  return (
    <div data-testid={ `${i}-recipe-card` }>
      <img
        src={ `${drink.strDrinkThumb}` }
        alt="Imagem da Receita"
        data-testid={ `${i}-card-img` }
        className="drink-img"
      />
      <h4 data-testid={ `${i}-card-name` }>{drink.strDrink}</h4>
    </div>
  );
}

CardDrink.propTypes = {
  drink: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};

export default CardDrink;
