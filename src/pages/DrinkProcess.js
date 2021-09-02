import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './pageCSS/DrinkProcess.css';
import PropTypes from 'prop-types';
import searchDrinkId from '../services/Header-SearchBar/Drinks/searchDrinkId';
import Loading from '../components/Loading';

const callbackHandleClick = (id, name) => {
  const getLocalStorage = () => JSON.parse(localStorage
    .getItem('inProgressRecipes')) || { cocktails: { [id]: [name] }, meals: {} };

  if (!getLocalStorage().cocktails[id]) {
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify({
          ...getLocalStorage(),
          cocktails: { ...getLocalStorage().cocktails,
            [id]: [name] } }));
    return false;
  }

  const removeIngredient = getLocalStorage().cocktails[id]
    .filter((ingredient) => ingredient !== name);

  const isOnList = getLocalStorage().cocktails[id].includes(name);

  if (!isOnList) {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({
        ...getLocalStorage(),
        cocktails: { ...getLocalStorage().cocktails,
          [id]: [...getLocalStorage().cocktails[id],
            name] } }));
    return false;
  }

  localStorage.setItem('inProgressRecipes', JSON
    .stringify({
      ...getLocalStorage(),
      cocktails: { ...getLocalStorage().cocktails,
        [id]: removeIngredient } }));
};

const returnListFromKeys = (keys) => {
  const listIngredients = keys.filter((item) => item
    .includes('strIngredient'));
  const listMeasures = keys.filter((item) => item.includes('strMeasure'));
  return [listIngredients, listMeasures];
};

export default function DrinkRecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const [resultDrinkRecipe, setResultDrinkRecipe] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFullyChecked, setIsFullyChecked] = useState([false]);

  useEffect(() => {
    const resolveAPI = async () => {
      const { drinks } = await searchDrinkId(id);
      setResultDrinkRecipe(drinks);
    };
    resolveAPI();
    const { cocktails } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] }, meals: {} };
    setCheckedIngredients([...cocktails[id]]);
  }, [id]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const defaultObject = {
      ...getLocalStorage,
      cocktails: { ...getLocalStorage.cocktails,
        [id]: [] },
    };

    if (!getLocalStorage.cocktails[id]) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(defaultObject));
      return false;
    }
  }, [id]);

  useEffect(() => {
    if (resultDrinkRecipe.length > 0
      && checkedIngredients.length > 0
      && checkedIngredients.length === Object.entries(resultDrinkRecipe[0])
        .filter((string) => string[0]
          .includes('strIngredient') && string[1]).length) {
      setIsFullyChecked(true);
    } else {
      setIsFullyChecked(false);
    }
  }, [checkedIngredients, resultDrinkRecipe]);

  const isIngredientChecked = (comparison) => checkedIngredients
    .some((ingredient) => ingredient === comparison);

  const updateStateFromLocalStorage = () => {
    const { cocktails } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] }, meals: {} };
    setCheckedIngredients([...cocktails[id]]);
  };

  const handleClick = ({ target: { name } }) => {
    callbackHandleClick(id, name);
  };

  if (resultDrinkRecipe.length > 0) {
    const {
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      strInstructions,
    } = resultDrinkRecipe[0];
    const listFromKeys = returnListFromKeys(Object.keys(resultDrinkRecipe[0]));
    return (
      <div className="recipe-details__div">
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <img
          data-testid="recipe-photo"
          className="recipe-details__thumb"
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <div className="recipe-progress__share-and-favorite-btn-div">
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Favoritar</button>
        </div>
        <span data-testid="recipe-category">{strAlcoholic}</span>
        <ul className="progress__checkbox-list">
          {listFromKeys[0].map((ingredient, index) => {
            if (resultDrinkRecipe[0][ingredient]) {
              return (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <label htmlFor={ `${ingredient}-checkbox` }>
                    <input
                      onClick={ handleClick }
                      type="checkbox"
                      id={ `${ingredient}-checkbox` }
                      name={ resultDrinkRecipe[0][ingredient] }
                      checked={ isIngredientChecked(resultDrinkRecipe[0][ingredient]) }
                      onChange={ updateStateFromLocalStorage }
                    />
                    <span>
                      { resultDrinkRecipe[0][ingredient] }
                      {' '}
                      -
                      {' '}
                      {resultDrinkRecipe[0][listFromKeys[1][index]]}
                    </span>
                  </label>
                </li>
              );
            }
            return false;
          })}
        </ul>
        <h2>Instruções:</h2>
        <p data-testid="instructions">{strInstructions}</p>
        <Link to="/receitas-feitas">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ !isFullyChecked }
            className="recipe-progress__finish-btn"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    );
  }

  return <Loading />;
}

DrinkRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;
