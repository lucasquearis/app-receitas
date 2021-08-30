import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoritesCard(props) {
  const { recipe, index } = props;

  const getCategory = () => {
    if (recipe.type === 'comida') {
      return (
        <p
          data-testid={ `${index}-hotizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category}` }
        </p>
      );
    }

    return (
      <p
        data-testid={ `${index}-hotizontal-top-text` }
      >
        { recipe.alcoholicOrNot }
      </p>
    );
  };

  return (
    <section className="favorite-card">
      <div className="image-section">
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </div>
      <div className="info-section">
        <div className="infos">
          { getCategory() }
          <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
        </div>
        <div className="buttons-section">
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="botão de compartilhar"
          />
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="botão de favoritar"
          />
        </div>
      </div>
    </section>
  );
}
