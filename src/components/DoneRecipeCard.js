// vitals
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
// styles
import '../styles/FavoriteRecipes.css';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard(
  { id, index, alcoholicOrNot, area, category, image,
    name, type, doneDate, tags },
) {
  const [copiedURL, setCopiedURL] = useState(false);
  const history = useHistory();

  const renderTitle = () => {
    if (type === 'bebida') {
      return (
        <div className="title-container">
          <h5 data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</h5>
        </div>
      );
    }

    if (type === 'comida' && area) {
      return (
        <div className="title-container">
          <h4
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${area} - ${category}`}
          </h4>
        </div>
      );
    }

    return (
      <div className="title-container">
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          {category}
        </h4>
      </div>
    );
  };

  return (
    <div className="card-element">
      <div className="favorites-image-container">
        <input
          type="image"
          src={ image }
          alt={ `Foto do produto ${name}` }
          data-testid={ `${index}-horizontal-image` }
          onClick={ () => {
            history.push(`/${type}s/${id}`);
          } }
        />
      </div>
      <div className="info-container">
        { renderTitle()}
        <div className="name-container">
          <button
            type="button"
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => history.push(`/${type}s/${id}`) }
          >
            {name}
          </button>
          <div>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Receita feita em:
              {doneDate ? <span>{doneDate}</span> : null}
            </p>
          </div>
        </div>
        <div className="favorite-and-share-buttons">
          <div>
            {
              tags
                ? tags
                  .filter((item, position) => position < 2)
                  .map((tag) => (
                    <div
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ tag }
                    >
                      {tag}
                    </div>))
                : null
            }
          </div>
          <input
            type="image"
            src={ shareIcon }
            alt="Ícone de copiar"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              copy(`http://localhost:3000/${type}s/${id}`);
              setCopiedURL(true);
            } }
          />
          {copiedURL ? <span>Link copiado!</span> : null}
        </div>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  image: PropTypes.string,
  area: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
export default DoneRecipeCard;
