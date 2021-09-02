import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import Input from './Input';
import FavoriteAndShare from './FavoriteAndShare';

export default function ProgressDrinkCard({ recipe, id }) {
  const initialState = {
    cocktails: { [id]: [] },
    meals: { },
  };

  const [state, setState] = useState(initialState);
  const { cocktails } = state;

  useEffect(() => {
    const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Storage) {
      return (Storage.cocktails[id].length > 0)
        ? setState({ ...Storage })
        : setState({ ...Storage, cocktails: { [id]: [] } });
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
      ? [...cocktails[id], name]
      : cocktails[id].filter((item) => item !== name);
    setState({ ...state, cocktails: { [id]: variavel } });
  };

  return (
    <div>
      <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="foto de comida" />

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
              checked={ cocktails[id].includes(item) }
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
      <button type="button"><Link to="/bebidas/">Bebidas</Link></button>
      <FavoriteAndShare
        recipe={ recipe }
        isFood={ false }
        id={ id }
      />
    </div>
  );
}

ProgressDrinkCard.propTypes = {
  recipe: shape({
    strDrink: string,
    strDrinkThumb: string,
    strCategory: string,
    strInstructions: string,
  }).isRequired,
  id: string.isRequired,
};
