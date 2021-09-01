import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';
import './FavoriteRecipe.css';

const RenderRecipes = ({ array, copied, copyLink, unfavoriteRecipe }) => {
  if (array) {
    return (
      <div>
        { array.map(({ id, type, name, image, category, area, alcoholicOrNot },
          index) => {
          if (type === 'comida') {
            return (
              <div key={ index } className="favorite-recipe-card">
                <div className="favorite-recipe-image-div">
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ image }
                      alt={ name }
                      style={ { height: '180px', width: '180px' } }
                    />
                  </Link>
                </div>
                <div className="favorite-recipe-infos-div">
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { `${area} - ${category}` }
                  </p>
                  <Link to={ `/${type}s/${id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                      className="favorite-recipe-name"
                    >
                      { name }
                    </p>
                  </Link>
                  <section className="buttons-container">
                    <label htmlFor="share">
                      <input
                        id="share"
                        type="image"
                        alt="Botão compartilhar"
                        src={ shareIcon }
                        data-testid={ `${index}-horizontal-share-btn` }
                        onClick={ copyLink }
                      />
                      {copied}
                    </label>
                    <input
                      type="image"
                      src={ favoriteIcon }
                      alt="Botão de favoritar"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      onClick={ unfavoriteRecipe }
                    />
                  </section>
                </div>
              </div>
            );
          }
          return (
            <div key={ index } className="favorite-recipe-card">
              <div className="favorite-recipe-image-div">
                <Link to={ `/${type}s/${id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                    alt={ name }
                    style={ { height: '180px', width: '180px' } }
                  />
                </Link>
              </div>
              <div className="favorite-recipe-infos-div">
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${alcoholicOrNot}` }
                </p>
                <Link to={ `/${type}s/${id}` }>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className="favorite-recipe-name"
                  >
                    { name }
                  </p>
                </Link>
                <section className="buttons-container">
                  <label htmlFor="share">
                    <input
                      id="share"
                      type="image"
                      alt="Botão compartilhar"
                      src={ shareIcon }
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ copyLink }
                    />
                    {copied}
                  </label>
                  <input
                    type="image"
                    src={ favoriteIcon }
                    alt="Botão de favoritar"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ unfavoriteRecipe }
                  />
                </section>
              </div>
            </div>
          );
        }) }
      </div>
    );
  }
  return null;
};

RenderRecipes.propTypes = {
  array: PropTypes.arrayOf({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
  copied: PropTypes.string.isRequired,
  copyLink: PropTypes.func.isRequired,
  unfavoriteRecipe: PropTypes.func.isRequired,
};

export default RenderRecipes;
