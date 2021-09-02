import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { shape, string } from 'prop-types';
import FavoriteAndShare from '../../components/FavoriteAndShare';
import Input from '../../components/Input';
import handleDoneRecipes from '../../helpers/handleDoneRecipes';

export default function ProgressFoodCard({ recipe, id }) {
  const initialState = {
    cocktails: {},
    meals: { [id]: [] },
  };

  const [state, setState] = useState(initialState);
  const [btnState, setBtnState] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { meals } = state;

  useEffect(() => {
    const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Storage) {
      return (Storage.meals[id])
        ? setState({ ...Storage })
        : setState({ ...Storage, meals: { ...Storage.meals, [id]: [] } });
    }
  }, [id]);

  const KeysList = Object.keys(recipe)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .filter((ele) => recipe[ele])
    .map((item) => recipe[item]);

  useEffect(() => {
    const finishedRecipe = () => {
      const recipeLength = KeysList.length;
      const itemsListLength = meals[id].length;
      const result = recipeLength !== itemsListLength;
      setBtnState(result);
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(state));
    if (KeysList.length > 0) finishedRecipe();
  }, [KeysList.length, id, meals, state]);

  const handleCheck = ({ target }) => {
    const { name, checked } = target;
    const ingredients = checked
      ? [...meals[id], name]
      : meals[id].filter((item) => item !== name);
    setState({ ...state, meals: { ...state.meals, [id]: ingredients } });
  };
  if (redirect) {
    return <Redirect to="/receitas-feitas" />;
  }
  return (
    <div>
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="foto de comida" />
      <FavoriteAndShare
        id={ id }
        isFood
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
        disabled={ btnState }
        onClick={ () => {
          handleDoneRecipes(recipe, true);
          setRedirect(true);
        } }
      >
        Complete
      </button>
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
