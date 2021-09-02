import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesMeals({ recipe, index }) {
  const [shareBtnClicked, setshareBtnClicked] = useState(false);
  return (
    <div key={ index }>
      <Link to={ `/comidas/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="recipe"
          src={ recipe.image }
          width="100px"
          height="100px"
        />
      </Link>
      <div>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { `${recipe.area} - ${recipe.category}` }
        </h4>
        <Link to={ `/comidas/${recipe.id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
        <h3 data-testid={ `${index}-horizontal-done-date` }>
          {`Feita em: ${recipe.doneDate}`}
        </h3>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => { setshareBtnClicked(true); navigator.clipboard.writeText(`http://localhost:3000/comidas/${recipe.id}`); } }
        >
          <img alt="shareBtn" src={ shareIcon } />
        </button>
        { shareBtnClicked ? <span>Link copiado!</span> : null}
        <div>
          { (recipe.tags).map((tag, indexTag) => {
            if (index > 1) return null;
            return (
              <span
                key={ indexTag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

DoneRecipesMeals.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipesMeals;
