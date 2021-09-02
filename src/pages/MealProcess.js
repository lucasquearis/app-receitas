import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import './pageCSS/MealProcess.css';
import PropTypes from 'prop-types';
import searchMealAPI from '../services/Header-SearchBar/Foods/searchFoodId';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const callbackHandleClick = (id, name) => {
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

const returnListFromKeys = (keys) => {
  const listIngredients = keys.filter((item) => item
    .includes('strIngredient'));
  const listMeasures = keys.filter((item) => item.includes('strMeasure'));
  return [listIngredients, listMeasures];
};

export default function MealProcess(props) {
  const { match: { params: { id } } } = props;
  const [resultMealRecipe, setResultMealRecipe] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFullyChecked, setIsFullyChecked] = useState([false]);
  const [linkShare, setLinkShare] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

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

  useEffect(() => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
  }, [id, favoriteRecipe]);

  useEffect(() => {
    if (resultMealRecipe.length > 0
      && checkedIngredients.length > 0
      && checkedIngredients.length === Object.entries(resultMealRecipe[0])
        .filter((string) => string[0]
          .includes('strIngredient') && string[1]).length) {
      setIsFullyChecked(true);
    } else {
      setIsFullyChecked(false);
    }
  }, [checkedIngredients, resultMealRecipe]);

  const isIngredientChecked = (comparison) => checkedIngredients
    .some((ingredient) => ingredient === comparison);

  const updateStateFromLocalStorage = () => {
    const { meals } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [] } };
    setCheckedIngredients([...meals[id]]);
  };

  const handleClick = ({ target: { name } }) => {
    callbackHandleClick(id, name);
  };

  /*
  const handleclickFavButton = (area = '', category, name, image) => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
    if (!favoriteRecipe) {
      const defaultRecipe = {
        id,
        type: 'comida',
        area,
        category,
        alcoholicOrNot: '',
        name,
        image,
      };
      setFavoriteRecipe(true);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify([...parseLocalStorage, defaultRecipe]));
    } else {
      const removeFavorite = parseLocalStorage.filter((recipe) => recipe.id !== id);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify([...removeFavorite]));
      setFavoriteRecipe(false);
    }
  }; */

  if (resultMealRecipe.length > 0) {
    const {
      strArea,
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
    } = resultMealRecipe[0];
    const listFromKeys = returnListFromKeys(Object.keys(resultMealRecipe[0]));
    return (
      <>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <button
          className="share-btn"
          data-testid="share-btn"
          onClick={ () => {
            copy(`http://localhost:3000/comidas/${id}`);
            setLinkShare(true);
          } }
          type="button"
        >
          <img
            src={ shareIcon }
            alt="imagem de compartilhar"
          />
        </button>
        { linkShare && 'Link copiado!' }
        <button
          className="favorite-btn"
          type="button"
          onClick={
            () => handleclickFavButton(strArea, strCategory, strMeal, strMealThumb)
          }
        >
          <img
            data-testid="favorite-btn"
            src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
            alt="icone favorito"
          />
        </button>
        <span data-testid="recipe-category">{strCategory}</span>
        <ul className="progress__checkbox-list">
          {listFromKeys[0].map((ingredient, index) => {
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
                      {resultMealRecipe[0][listFromKeys[1][index]]}
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
          >
            Finalizar Receita
          </button>
        </Link>
      </>
    );
  }

  return <Loading />;
}

MealProcess.propTypes = {
  id: PropTypes.number,
}.isRequired;
