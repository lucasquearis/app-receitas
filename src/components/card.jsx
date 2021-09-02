import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

const Card = ({ item, foodOrDrink, index, ingredientes }) => {
  const { foodData, drinkData, ingredientesData } = useContext(RecipesContext);
  const test = foodOrDrink === 'Meal' ? foodData : drinkData;
  if (ingredientes && ingredientesData.length > 0) {
    return foodOrDrink === 'Meal' ? (
      <div className="card-container" data-testid={ `${index}-ingredient-card` }>
        <img
          src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
          alt="ingredient"
          data-testid={ `${index}-card-img` }
          value={ item.strIngredient }
          className="card-image-food"
        />
        <span
          data-testid={ `${index}-card-name` }
          value={ item.strIngredient }
          className="card-text-food"
        >
          {item.strIngredient}
        </span>
      </div>
    )
      : (
        <div className="card-container-drink" data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
            alt="ingredient"
            data-testid={ `${index}-card-img` }
            value={ item.strIngredient1 }
            className="card-image-drink"
          />
          <span
            data-testid={ `${index}-card-name` }
            value={ item.strIngredient }
            className="card-text-drink"
          >
            {item.strIngredient1}
          </span>
        </div>
      );
  }
  if (test !== null && test.length > 0 && ingredientes === false) {
    return (
      <div className="card" data-testid={ `${index}-recipe-card` }>
        <img
          src={ item[`str${foodOrDrink}Thumb`] }
          alt="recipe"
          data-testid={ `${index}-card-img` }
          className="card-img-top"
        />
        <span
          className="card-body main-body"
          data-testid={ `${index}-card-name` }
        >
          {item[`str${foodOrDrink}`]}
        </span>
      </div>
    );
  }
  return <p> </p>;
};

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.string),
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ingredientes: PropTypes.bool,
};

Card.defaultProps = {
  item: {},
  ingredientes: true,
};

export default Card;
