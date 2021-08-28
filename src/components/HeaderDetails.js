import React from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function HeaderDetails(props) {
  const { recipe, keyType } = props;
  const type = keyType === 'meals' ? 'Meal' : 'Drink';
  return (
    <div className="imagem-container">
      <img
        className="imagem"
        src={ recipe[`str${type}Thumb`] }
        data-testid="recipe-photo"
        alt={ recipe[`str${type}`] }
      />
      <div className="infos-container">
        <h2
          className="recipe-title"
          data-testid="recipe-title"
        >
          { recipe[`str${type}`] }
        </h2>
        <button data-testid="favorite-btn" type="button">favorite</button>
        <ShareButton />
      </div>
      <h4
        className="recipe-category"
        data-testid="recipe-category"
      >
        { keyType === 'meals' ? recipe.strCategory : recipe.strAlcoholic }
      </h4>
    </div>
  );
}

HeaderDetails.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  keyType: PropTypes.string.isRequired,
};
