import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { fetchDrinkById } from '../../services/fetchApi';
import FavoriteAndShare from '../../components/FavoriteAndShare';
import Input from '../../components/Input';
import handleDoneRecipes from '../../helpers/handleDoneRecipes';
import Loading from '../../components/Loading';
import '../css/progressRecipe.css';

export default function ProgressDrink({ match: { params: { id } } }) {
  const initialState = {
    cocktails: { [id]: [] },
    meals: { },
  };

  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(initialState);
  const [btnState, setBtnState] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { cocktails } = state;

  const initialUpdate = () => {
    const fetchApi = async () => {
      const drinks = await fetchDrinkById(id);
      setRecipe(drinks);
      setIsLoading(false);
    };
    fetchApi();
    const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Storage) {
      return (Storage.cocktails[id])
        ? setState({ ...Storage })
        : setState({ ...Storage, cocktails: { ...Storage.cocktails, [id]: [] } });
    }
  };

  const keysList = Object.keys(recipe)
    .filter((ingredient) => ingredient.includes('strIngredient'))
    .filter((ele) => recipe[ele])
    .map((item) => recipe[item]);

  const updateDoneRecipes = () => {
    const finishedRecipe = () => {
      const recipeLength = keysList.length;
      const itemsListLength = cocktails[id].length;
      const result = recipeLength !== itemsListLength;
      setBtnState(result);
    };

    const saveInLocalStorage = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(state));
    };
    saveInLocalStorage();
    if (keysList.length) finishedRecipe();
  };

  useEffect(initialUpdate, [id]);
  useEffect(updateDoneRecipes, [keysList.length, cocktails, id, recipe, state]);

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

  const decoration = (item) => (`${cocktails[id].includes(item)
    ? 'line-through'
    : 'none'}`);

  return (
    <div className="progress-recipe">
      <Link className="to-home" to="/bebidas">
        <i className="bi bi-house-fill" />
      </Link>
      {isLoading ? <Loading /> : ''}
      <img
        className="progress-img"
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt="foto de comida"
      />
      <section className="progress-title-container">
        <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
        <FavoriteAndShare
          id={ id }
          recipe={ recipe }
        />
      </section>
      <span
        className="progress-category"
        data-testid="recipe-category"
      >
        {recipe.strCategory}
      </span>
      <ul className="progress-recipe-ingredients">
        {keysList.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <Input
              style={ { textDecoration: decoration(item) } }
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
      <p
        className="progress-instructions"
        data-testid="instructions"
      >
        {recipe.strInstructions}
      </p>
      <button
        className="progress-btn"
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
