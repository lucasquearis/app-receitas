import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import FoodContext from '../context/FoodContext';

const RecipeCard = ({ recipe, index }) => {
  const history = useHistory();
  const { setFoodDetails } = useContext(FoodContext);

  const handleClick = ({ idMeal }) => {
    setFoodDetails(idMeal);
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <div
      role="tab"
      tabIndex={ 0 }
      onClick={ () => handleClick(recipe) }
      onKeyDown={ () => handleClick(recipe) }
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ recipe.strMealThumb }
        alt="recipe"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
