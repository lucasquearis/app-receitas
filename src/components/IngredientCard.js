import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function IngredientCard({ ingredient: { strIngredient, strIngredient1 }, index, type }) {
  const ingredient = strIngredient1 || strIngredient;
  const history = useHistory();
  const {
    requestCategory,
    setFoodRecipes,
    setDrinkRecipes,
    setRedirect,
  } = useContext(Context);

  const requestCategories = () => {
    if (type === 'cocktail') {
      return requestCategory(`https://www.the${type}db.com/api/json/v1/1/filter.php?i=${strIngredient1}`, setDrinkRecipes);
    }
    return requestCategory(`https://www.the${type}db.com/api/json/v1/1/filter.php?i=${strIngredient}`, setFoodRecipes);
  };

  const handleClick = () => {
    requestCategories();
    setRedirect(true);
    history.push(`/${type === 'meal' ? 'comidas' : 'bebidas'}`);
  };

  return (
    <button type="button" onClick={ () => handleClick() }>
      <div data-testid={ `${index}-ingredient-card` }>
        <h2 data-testid={ `${index}-card-name` }>{ ingredient }</h2>
        <img
          src={ `https://www.the${type}db.com/images/ingredients/${ingredient}-Small.png` }
          data-testid={ `${index}-card-img` }
          alt={ ingredient }
        />
      </div>
    </button>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
};

export default IngredientCard;
