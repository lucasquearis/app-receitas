import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipesMeals({ recipe, index, removeRecipe }) {
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
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => { setshareBtnClicked(true); navigator.clipboard.writeText(`http://localhost:3000/comidas/${recipe.id}`); } }
        >
          <img alt="shareBtn" src={ shareIcon } />
        </button>
        { shareBtnClicked ? <span>Link copiado!</span> : null}
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          onClick={ () => {
            const newRecipes = (JSON.parse(localStorage.getItem('favoriteRecipes'))
              .filter((recipeArr) => recipeArr.id !== recipe.id) || []);
            localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
            removeRecipe(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
          } }
        >
          <img alt="favoriteBtn" src={ blackHeartIcon } />
        </button>
      </div>
    </div>
  );
}

FavoriteRecipesMeals.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  removeRecipe: PropTypes.func.isRequired,
};

export default FavoriteRecipesMeals;
