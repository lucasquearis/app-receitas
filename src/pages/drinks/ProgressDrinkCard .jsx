import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { shape, string } from 'prop-types';
import FavoriteAndShare from '../../components/FavoriteAndShare';
import Input from '../../components/Input';

export default function ProgressDrinkCard({ recipe, id }) {
  const initialState = {
    cocktails: { [id]: [] },
    meals: { },
  };

  const [state, setState] = useState(initialState);
  const [btnState, setBtnState] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { cocktails } = state;

  useEffect(() => {
    const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Storage) {
      return (Storage.cocktails[id])
        ? setState({ ...Storage })
        : setState({ ...Storage, cocktails: { ...Storage.cocktails, [id]: [] } });
    }
  }, [id]);

  const KeysList = Object.keys(recipe)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .filter((ele) => recipe[ele])
    .map((item) => recipe[item]);

  const handleCheck = ({ target }) => {
    const { name, checked } = target;
    const variavel = checked
      ? [...cocktails[id], name]
      : cocktails[id].filter((item) => item !== name);
    setState({ ...state, cocktails: { ...state.cocktails, [id]: variavel } });
  };

  const finishedRecipe = () => {
    const recipeLength = KeysList.length;
    const itemsListLength = cocktails[id].length;
    const result = recipeLength !== itemsListLength;
    setBtnState(result);
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(state));
    if (KeysList.length > 0) finishedRecipe();
  }, [state]);

  if (redirect) {
    return <Redirect to="/receitas-feitas" />;
  }
  return (
    <div>
      <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="foto de comida" />
      <FavoriteAndShare
        id={ id }
        recipe={ recipe }
      />
      <span data-testid="recipe-category">
        {recipe.strCategory}
      </span>
      <ul>
        {KeysList.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <Input
              type="checkbox"
              id={ item + index }
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
        disabled={ btnState }
        onClick={ () => setRedirect(true) }
      >
        Complete
      </button>
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
