import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context/RecipesContext';

const onze = 11;
function RecipeCard({ recipe, index, tag, id, page }) {
  const { history } = useContext(RecipesContext);
  if (index > onze) {
    return null;
  }
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <button type="button" onClick={ () => history.push(`/${page}/${id}`) }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[`str${tag}Thumb`] }
          alt="Recipe"
        />
      </button>
      <h1 data-testid={ `${index}-card-name` }>{ recipe[`str${tag}`] }</h1>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(String).isRequired,
  index: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
  id: PropTypes.string,
  page: PropTypes.string.isRequired,
};

RecipeCard.defaultProps = {
  id: undefined,
};
export default RecipeCard;
