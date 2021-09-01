import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function RenderDrink({ recipe, index }) {
  return (
    <section key={ recipe.name }>
      <img
        alt="imagem da receita"
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</p>
      <h1 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h1>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
      <button
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          alt="ícone de compartilhar"
          src={ shareIcon }
        />
      </button>
    </section>
  );
}

RenderDrink.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RenderDrink;
