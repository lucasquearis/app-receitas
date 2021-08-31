import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

const Card = ({ item, foodOrDrink, index, ingredientes }) => {
  const { foodData, drinkData, ingredientesData } = useContext(RecipesContext);
  const test = foodOrDrink === 'Meal' ? foodData : drinkData;
  if (ingredientes && ingredientesData.length > 0) {
    return foodOrDrink === 'Meal' ? (
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
          alt="ingredient"
          data-testid={ `${index}-card-img` }
          value={ item.strIngredient }
        />
        <span
          data-testid={ `${index}-card-name` }
          value={ item.strIngredient }
        >
          {item.strIngredient}
        </span>
      </div>
    )
      : (
        <div data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
            alt="ingredient"
            data-testid={ `${index}-card-img` }
            value={ item.strIngredient1 }
          />
          <span
            data-testid={ `${index}-card-name` }
            value={ item.strIngredient }
          >
            {item.strIngredient1}
          </span>
        </div>
      );
  }
  if (test !== null && test.length > 0 && ingredientes === false) {
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ item[`str${foodOrDrink}Thumb`] }
          alt="recipe"
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{item[`str${foodOrDrink}`]}</span>
      </div>
    );
  }
  return <p> </p>;
};

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ingredientes: PropTypes.bool.isRequired,
};

export default Card;
