import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchMealDetailsApi from '../services/fetchMealDetailsApi';
import getIngredients from '../util/getIngredients';
import getMeasure from '../util/getMeasures';
import getFavoriteFood from '../util/getFavoriteFood';
import onFavoriteFood from '../util/onFavoriteFood';
import Copy from '../components/Clipboard-Copy';

const RecipeInProgress = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const pathnameSeparate = pathname.split('/');
  const id = pathnameSeparate[2];

  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFullyChecked, setIsFullyChecked] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const { meals } = await fetchMealDetailsApi(id);
      setFoodDetails(meals);
    };
    fetchDetails();
    const { meals } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [] } };
    if (meals[id]) {
      setCheckedIngredients([...meals[id]]);
    }
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
    }
  }, [id]);

  useEffect(() => {
    if (foodDetails.length > 0
      && checkedIngredients.length > 0
      && checkedIngredients.length === Object.entries(foodDetails[0])
        .filter((string) => string[0]
          .includes('strIngredient') && string[1]).length) {
      setIsFullyChecked(true);
    } else {
      setIsFullyChecked(false);
    }
  }, [checkedIngredients, foodDetails]);

  const handleClick = ({ target: { name } }) => {
    const getLocalStorage = () => JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [name] } };

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

  const updateStateFromLocalStorage = () => {
    const { meals } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: { [id]: [] } };
    setCheckedIngredients([...meals[id]]);
  };

  const isIngredientChecked = (comparison) => checkedIngredients
    .some((ingredient) => ingredient === comparison);

  function DetailUrl() {
    const url = window.location.href;
    const splitUrl = url.split('/');
    const detailUrl = `${splitUrl[0]}//${splitUrl[2]}/comidas/${id}`;
    Copy(detailUrl);
    setShowMsg(true);
  }

  function finishRecipe() {
    const {
      idMeal,
      strCategory: category,
      strArea: area,
      strMeal: name,
      strMealThumb: image,
      strTags: tags,
    } = foodDetails[0];

    const item = {
      id: idMeal,
      type: 'comida',
      area,
      category,
      alcoholicOrNot: '',
      name,
      image,
      tags,
      doneDate: Date(),
    };

    const doneStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (doneStorage === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([item]));
      return;
    }

    localStorage.setItem('doneRecipes', JSON
      .stringify([
        ...doneStorage,
        item,
      ]));

    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete progressStorage.meals[id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
    history.push('/receitas-feitas');
  }

  useEffect(() => {
    fetchMealDetailsApi(id).then((data) => setFoodDetails(data.meals));
  }, [id]);

  useEffect(() => {
    getFavoriteFood(foodDetails, setFavorite);
    getIngredients(foodDetails, setIngredients);
    getMeasure(foodDetails, setMeasures);
  }, [foodDetails]);

  return (
    <div>
      {
        foodDetails && foodDetails.map(({
          strMealThumb,
          strMeal,
          strCategory,
          strInstructions,
        }, i) => (
          <div className="details-container" key={ i }>
            <img
              key={ strMealThumb }
              src={ strMealThumb }
              alt="thumbnail"
              data-testid="recipe-photo"
              className="details-image"
            />
            <div className="details-buttons">
              <h1 key={ strMeal } data-testid="recipe-title">{strMeal}</h1>
              <div>
                <button
                  type="button"
                  data-testid="share-btn"
                  key={ shareIcon }
                  onClick={ DetailUrl }
                >
                  <img src={ shareIcon } alt="share-icon" />
                </button>
                <button
                  type="button"
                  onClick={ () => onFavoriteFood(foodDetails, setFavorite, favorite) }
                  key={ blackHeartIcon }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ (favorite) ? blackHeartIcon : whiteHeartIcon }
                    alt="favorite-icon"
                  />
                </button>
              </div>
            </div>
            { showMsg && <p>Link copiado!</p> }
            <h2 data-testid="recipe-category" key={ strCategory }>{strCategory}</h2>
            <h3>Ingredients</h3>
            <ul>
              {
                ingredients.map((ingredient) => ingredient
                  .map((item, index) => (
                    <li
                      key={ item }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ item }
                        name={ item }
                        value={ item }
                        onClick={ handleClick }
                        onChange={ updateStateFromLocalStorage }
                        checked={ isIngredientChecked(item) }
                      />
                      {`${item} - ${measures[0][index]}`}
                    </li>
                  )))
              }
            </ul>
            <p data-testid="instructions" key={ strInstructions }>{strInstructions}</p>
            <button
              data-testid="finish-recipe-btn"
              key={ i }
              type="button"
              className="start-recipe-btn"
              disabled={ !isFullyChecked }
              onClick={ finishRecipe }
            >
              Finalizar receita
            </button>
          </div>))
      }
    </div>
  );
};

export default RecipeInProgress;
