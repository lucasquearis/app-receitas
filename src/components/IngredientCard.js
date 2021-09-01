import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { number, object, string } from 'prop-types';

function IngredientCard({ ingredient, type, index }) {
  const [whichType] = useState(() => {
    if (type === 'comidas') {
      return `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`;
    }
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
  });

  const handleClick = () => {
    let ingredientToSave;
    if (type === 'comidas') {
      ingredientToSave = ingredient.strIngredient;
    } else {
      ingredientToSave = ingredient.strIngredient1;
    }
    localStorage.setItem('filterIngredient', ingredientToSave);
  };

  return (
    <Link
      to={ `/${type}` }
      onClick={ handleClick }
    >
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ whichType }
          alt="ingredient-thumbnail"
        />
        <h3 data-testid={ `${index}-card-name` }>
          { type === 'comidas' ? ingredient.strIngredient : ingredient.strIngredient1 }
        </h3>
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: object,
  type: string,
  index: number,
}.isRequired;

export default IngredientCard;
