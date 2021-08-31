import React, { useEffect, useState } from 'react';
import './pageCSS/MealProcess.css';
import PropTypes from 'prop-types';
import searchMealAPI from '../services/Header-SearchBar/Foods/searchFoodId';
import Loading from '../components/Loading';

export default function MealProcess(props) {
  const { match: { params: { id } } } = props;
  const [resultMealRecipe, setResultMealRecipe] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const resolveAPI = async () => {
      const { meals } = await searchMealAPI(id);
      setResultMealRecipe(meals);
    };
    resolveAPI();
    const { meals } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [] } };
    setCheckedIngredients([...meals[id]]);
  }, [id]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, cocktails: {} };
    const defaultObject = {
      ...getLocalStorage,
      meals: { ...getLocalStorage.meals,
        [id]: [] },
    };

    if (!getLocalStorage.meals[id]) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(defaultObject));
      return false;
    }
  }, [id]);

  const isIngredientChecked = (comparison) => checkedIngredients
    .some((ingredient) => ingredient === comparison);

  const updateStateFromLocalStorage = () => {
    const { meals } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [] } };
    setCheckedIngredients([...meals[id]]);
  };

  const handleClick = ({ target: { name } }) => {
    const getLocalStorage = () => JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [name] } };

    if (!getLocalStorage().meals[id]) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify({
            ...getLocalStorage(),
            meals: { ...getLocalStorage().meals,
              [id]: [name] } }));
      return false;
    }

    const removeIngredient = getLocalStorage().meals[id]
      .filter((ingredient) => ingredient !== name);

    const isOnList = getLocalStorage().meals[id].includes(name);

    if (!isOnList) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({
          ...getLocalStorage(),
          meals: { ...getLocalStorage().meals,
            [id]: [...getLocalStorage().meals[id],
              name] } }));
      return false;
    }

    localStorage.setItem('inProgressRecipes', JSON
      .stringify({
        ...getLocalStorage(),
        meals: { ...getLocalStorage().meals,
          [id]: removeIngredient } }));
  };

  if (resultMealRecipe.length > 0) {
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
    } = resultMealRecipe[0];
    const keysIngredients = Object.keys(resultMealRecipe[0]);
    const listIngredients = keysIngredients.filter((item) => item
      .includes('strIngredient'));
    const listMeasures = keysIngredients.filter((item) => item.includes('strMeasure'));
    return (
      <>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <span data-testid="recipe-category">{strCategory}</span>
        <ul className="progress__checkbox-list">
          {listIngredients.map((ingredient, index) => {
            if (resultMealRecipe[0][ingredient]) {
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
                      name={ resultMealRecipe[0][ingredient] }
                      checked={ isIngredientChecked(resultMealRecipe[0][ingredient]) }
                      onChange={ updateStateFromLocalStorage }
                    />
                    <span>
                      { resultMealRecipe[0][ingredient] }
                      {' '}
                      -
                      {' '}
                      {resultMealRecipe[0][listMeasures[index]]}
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
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </>
    );
  }

  return <Loading />;
}

MealProcess.propTypes = {
  id: PropTypes.number,
}.isRequired;
