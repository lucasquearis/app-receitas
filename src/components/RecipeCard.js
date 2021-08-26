import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function RecipeCard({
  item,
  index,
}) {
  const { filter: { src } } = useContext(Context);
  const thumb = src === 'meal' ? item.strMealThumb : item.strDrinkThumb;
  const str = src === 'meal' ? item.strMeal : item.strDrink;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ str }
      />
      <h2 data-testid={ `${index}-card-name` }>{ str }</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
