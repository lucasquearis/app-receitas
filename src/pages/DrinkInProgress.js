import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDrinkDetailsApi from '../services/fetchDrinkDetailsApi';
// import Copy from '../components/Clipboard-Copy';

const DrinkInProgress = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const pathnameSeparate = pathname.split('/');
  const actualPath = pathnameSeparate[2];

  const { drinkDetails, setDrinkDetails } = useContext(DrinksContext);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [showMsg] = useState(false);
  const THREE = 3;

  function onFavorite() {
    setFavorite(!favorite);

    const {
      idDrink: id,
      strCategory: category,
      strAlcoholic: alcoholicOrNot,
      strDrink: name,
      strDrinkThumb: image,
    } = drinkDetails[0];

    const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const item = { id, type: 'comida', area: '', category, alcoholicOrNot, name, image };

    if (actualStorage === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([item]));
      return;
    }

    if (!favorite) {
      actualStorage.push(item);
      localStorage.setItem('favoriteRecipes', JSON.stringify(actualStorage));
    } else {
      const newStorage = actualStorage.filter(
        (favoriteItem) => favoriteItem.id !== item.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
  }

  useEffect(() => {
    fetchDrinkDetailsApi(actualPath).then((data) => setDrinkDetails(data.drinks));
  }, [setDrinkDetails, actualPath]);

  useEffect(() => {
    // const EIGHT = 8;
    const getFavorite = () => {
      const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (actualStorage && drinkDetails.length > 0) {
        const isFavorited = actualStorage.some(
          (item) => item.id === drinkDetails[0].idMeal,
        );
        setFavorite(isFavorited);
      }
    };

    const getIngredients = () => {
      const ingredientsArr = drinkDetails.map((item) => Object.entries(item)
        .filter((i) => i[0].includes('Ingredient') && i[1] !== '' && i[1] !== 'null'));
      const ingredientsOnly = ingredientsArr.map((item) => item
        .map((i) => i.pop())).map((item) => item);
      //   const ingredientsF = ingredientsOnly.slice(0, EIGHT);
      setIngredients(ingredientsOnly);
    };

    const getMeasure = () => {
      const measuresArr = drinkDetails.map((item) => Object.entries(item)
        .filter((i) => i[0].includes('Measure') && i[1] !== ' '));
      const measuresOnly = measuresArr.map((item) => item
        .map((i) => i.pop())).map((item) => item);
      //   const measuresF = measuresOnly.slice(0, EIGHT);
      setMeasures(measuresOnly);
    };

    getFavorite();
    getIngredients();
    getMeasure();
  }, [drinkDetails]);

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
                //   onClick={ () => copy() }
                >
                  <img src={ shareIcon } alt="share-icon" />
                </button>
                <button
                  type="button"
                  onClick={ onFavorite }
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
            { showMsg ? <p>Link copiado!</p> : undefined }
            <h2 data-testid="recipe-category" key={ strAlcoholic }>{strAlcoholic}</h2>
            <h2 data-testid="recipe-category" key={ strCategory }>{strCategory}</h2>
            <h3>Ingredients</h3>
            <ul>
              {
                ingredients.map((ingredient) => ingredient
                  .slice(0, THREE).map((item, index) => (
                    <li
                      key={ item }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input type="checkbox" id={ item } name={ item } />
                      {`${item} - ${measures[0][index]}`}
                    </li>
                  )))
              }
            </ul>
            <p data-testid="instructions" key={ strInstructions }>{strInstructions}</p>
            <Link to="/receitas-feitas">
              <button
                data-testid="finish-recipe-btn"
                key={ i }
                type="button"
                className="start-recipe-btn"
              >
                Finalizar receita
              </button>
            </Link>
          </div>))
      }
    </div>
  );
};

export default DrinkInProgress;
