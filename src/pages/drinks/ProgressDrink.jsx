import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';
import FavoriteAndShare from '../../components/FavoriteAndShare';
import Input from '../../components/Input';
import handleDoneRecipes from '../../helpers/handleDoneRecipes';

export default function ProgressDrink({ match: { params: { id } } }) {
  const initialState = {
    cocktails: { [id]: [] },
    meals: { },
  };

  const [recipe, setRecipe] = useState({});
  const [state, setState] = useState(initialState);
  const [btnState, setBtnState] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { cocktails } = state;

  const initialUpdate = () => {
    const fetchApi = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetch(url).then((r) => r.json());
      setRecipe(drinks[0]);
    };
    fetchApi();
    const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Storage) {
      return (Storage.cocktails[id])
        ? setState({ ...Storage })
        : setState({ ...Storage, cocktails: { ...Storage.cocktails, [id]: [] } });
    }
  };

  const KeysList = Object.keys(recipe)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .filter((ele) => recipe[ele])
    .map((item) => recipe[item]);

  const updateDoneRecipes = () => {
    const finishedRecipe = () => {
      const recipeLength = KeysList.length;
      const itemsListLength = cocktails[id].length;
      const result = recipeLength !== itemsListLength;
      setBtnState(result);
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(state));
    if (KeysList.length > 0) finishedRecipe();
  };

  useEffect(initialUpdate, [id]);
  useEffect(updateDoneRecipes, [KeysList.length, cocktails, id, recipe, state]);

  const handleCheck = ({ target }) => {
    const { name, checked } = target;
    const ingredients = checked
      ? [...cocktails[id], name]
      : cocktails[id].filter((item) => item !== name);
    setState({ ...state, cocktails: { ...state.cocktails, [id]: ingredients } });
  };

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
        onClick={ () => {
          handleDoneRecipes(recipe);
          setRedirect(true);
        } }
      >
        Complete
      </button>
    </div>
  );
}

ProgressDrink.propTypes = {
  match: shape({
    url: string,
    params: shape({ id: string }) }).isRequired,
};
