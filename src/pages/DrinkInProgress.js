import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDrinkDetailsApi from '../services/fetchDrinkDetailsApi';
import getIngredients from '../util/getIngredients';
import getMeasure from '../util/getMeasures';
import getFavoriteDrink from '../util/getFavoriteDrink';
import onFavoriteDrink from '../util/onFavoriteDrink';
import Copy from '../components/Clipboard-Copy';

const DrinkInProgress = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const pathnameSeparate = pathname.split('/');
  const id = pathnameSeparate[2];

  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFullyChecked, setIsFullyChecked] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const { drinks } = await fetchDrinkDetailsApi(id);
      setDrinkDetails(drinks);
    };
    fetchDetails();
    const { cocktails } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] }, meals: {} };
    if (cocktails[id]) {
      setCheckedIngredients([...cocktails[id]]);
    }
  }, [id]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, cocktails: {} };
    const defaultObject = {
      ...getLocalStorage,
      cocktails: { ...getLocalStorage.cocktails,
        [id]: [] },
    };

    if (!getLocalStorage.cocktails[id]) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(defaultObject));
    }
  }, [id]);

  useEffect(() => {
    if (drinkDetails.length > 0
      && checkedIngredients.length > 0
      && checkedIngredients.length === Object.entries(drinkDetails[0])
        .filter((string) => string[0]
          .includes('strIngredient') && string[1]).length) {
      setIsFullyChecked(true);
    } else {
      setIsFullyChecked(false);
    }
  }, [checkedIngredients, drinkDetails]);

  const handleClick = ({ target: { name } }) => {
    const getLocalStorage = () => JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [name] }, meals: {} };

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

  const updateStateFromLocalStorage = () => {
    const { cocktails } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] }, meals: {} };
    setCheckedIngredients([...cocktails[id]]);
  };

  const isIngredientChecked = (comparison) => checkedIngredients
    .some((ingredient) => ingredient === comparison);

  function DetailUrl() {
    const url = window.location.href;
    const splitUrl = url.split('/');
    const detailUrl = `${splitUrl[0]}//${splitUrl[2]}/bebidas/${id}`;
    Copy(detailUrl);
    setShowMsg(true);
  }

  useEffect(() => {
    fetchDrinkDetailsApi(id).then((data) => setDrinkDetails(data.drinks));
  }, [id]);

  useEffect(() => {
    getFavoriteDrink(drinkDetails, setFavorite);
    getIngredients(drinkDetails, setIngredients);
    getMeasure(drinkDetails, setMeasures);
  }, [drinkDetails]);

  function finishRecipe() {
    const {
      idDrink,
      strCategory: category,
      strAlcoholic: alcoholicOrNot,
      strDrink: name,
      strDrinkThumb: image,
      strTags: tags,
    } = drinkDetails[0];

    const item = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category,
      alcoholicOrNot,
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
    delete progressStorage.cocktails[id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressStorage));
    history.push('/receitas-feitas');
  }

  return (
    <div className="drink-details-container">
      {
        drinkDetails.map(({
          strDrinkThumb,
          strDrink,
          strCategory,
          strInstructions,
          strAlcoholic,
        }, i) => (
          <div key={ i }>
            <img
              key={ strDrinkThumb }
              src={ strDrinkThumb }
              alt="thumbnail"
              data-testid="recipe-photo"
              className="details-image"
            />
            <div className="details-buttons">
              <h1 key={ strDrink } data-testid="recipe-title">{strDrink}</h1>
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
                  onClick={ () => onFavoriteDrink(drinkDetails, setFavorite, favorite) }
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
            <h2 data-testid="recipe-category" key={ strAlcoholic }>{strAlcoholic}</h2>
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

export default DrinkInProgress;
