import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const RenderRecipes = ({ array, copied, copyLink }) => {
  if (array) {
    return (
      <div>
        { array.map(({ id, type, name, image, category,
          area, alcoholicOrNot, doneDate, tags }, index) => {
          if (type === 'comida') {
            return (
              <div key={ index }>
                <Link to={ `/${type}s/${id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                    alt={ name }
                    style={ { height: '300px', width: '300px' } }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${area} - ${category}` }
                </p>
                <Link to={ `/${type}s/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
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
                </section>
                { tags.map((tag, pIndex) => (
                  <p
                    key={ pIndex }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                )) }
              </div>
            );
          }
          return (
            <div key={ index }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                  style={ { height: '300px', width: '300px' } }
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${alcoholicOrNot}` }
              </p>
              <Link to={ `/${type}s/${id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
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
              </section>
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
};

export default RenderRecipes;
