import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function RenderFood({ recipe, index }) {
  console.log(recipe, index);
  return (
    <section key={ recipe.name }>
      <img
        alt="imagem da receita"
        data-testid={ `${index}-horizontal-image` }
        src={ recipe.image }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${recipe.area} - ${recipe.category}`}
      </p>
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
      {
        recipe.tags.map((tag) => (
          <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</p>
        ))
      }
    </section>
  );
}

RenderFood.propTypes = {
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

export default RenderFood;
