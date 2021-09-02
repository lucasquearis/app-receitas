import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import Input from './Input';
import FavoriteAndShare from './FavoriteAndShare';

export default function ProgressFoodCard({ recipe, id }) {
  const initialState = {
    cocktails: {},
    meals: { [id]: [] },
  };

  const [state, setState] = useState(initialState);
  const { meals } = state;

  useEffect(() => {
    const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Storage) {
      return (Storage.meals[id].length > 0)
        ? setState({ ...Storage })
        : setState({ ...Storage, meals: { [id]: [] } });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(state));
  }, [state]);

  const KeysList = Object.keys(recipe)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .filter((ele) => recipe[ele])
    .map((item) => recipe[item]);

  const handleCheck = ({ target }) => {
    const { name, checked } = target;
    const variavel = checked
      ? [...meals[id], name]
      : meals[id].filter((item) => item !== name);
    setState({ ...state, meals: { [id]: variavel } });
  };

  return (
    <div>
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="foto de comida" />
      <span data-testid="recipe-category">
        category:
        {recipe.strCategory}
      </span>
      <ul>
        {KeysList.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <Input
              type="checkbox"
              id={ toString(index) }
              name={ item }
              checked={ meals[id].includes(item) }
              textLabel={ item }
              onChange={ handleCheck }
            />
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Complete
      </button>
      <button type="button"><Link to="/comidas/">comida</Link></button>
      <FavoriteAndShare
        recipe={ recipe }
        isFood
        id={ id }
      />
    </div>
  );
}

ProgressFoodCard.propTypes = {
  recipe: shape({
    strMeal: string,
    strMealThumb: string,
    strCategory: string,
    strInstructions: string,
  }).isRequired,
  id: string.isRequired,
};
