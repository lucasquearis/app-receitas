import React, { useState, useContext, useEffect } from 'react';
// import FoodContext from '../context/FoodContext';
import { useHistory } from 'react-router';
import DrinksContext from '../context/DrinksContext';
import fetchDrinkDetailsApi from '../services/fetchDrinkDetailsApi';
import './details.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const DrinkDetails = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const pathnameSeparate = pathname.split('/');
  const actualPath = pathnameSeparate[2];

  const { drinkDetails, setDrinkDetails } = useContext(DrinksContext);
  //   const { drinks } = useContext(DrinksContext);
  const [ingredients, setIngredients] = useState();
  const [measures, setMeasures] = useState();

  const getIngredients = () => {
    const ingredientsArr = drinkDetails.map((item) => Object.entries(item)
      .filter((i) => i[0].includes('Ingredient') && i[1] !== null));
    const ingredientsOnly = ingredientsArr.map((item) => item
      .map((i) => i.pop())).map((item) => item);
    setIngredients(ingredientsOnly);
  };

  const getMeasure = () => {
    const measuresArr = drinkDetails.map((item) => Object.entries(item)
      .filter((i) => i[0].includes('Measure') && i[1] !== null));
    const measuresOnly = measuresArr.map((item) => item
      .map((i) => i.pop())).map((item) => item);
    setMeasures(measuresOnly);
  };

  useEffect(() => {
    fetchDrinkDetailsApi(actualPath).then((data) => setDrinkDetails(data.drinks));
  }, [actualPath]);

  useEffect(() => {
    getIngredients();
    getMeasure();
  }, [drinkDetails]);

  return (
    <div>
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
              className="describe-image"
            />
            <h1 key={ strDrink } data-testid="recipe-title">{strDrink}</h1>
            <button
              type="button"
              data-testid="share-btn"
              key={ shareIcon }
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              key={ blackHeartIcon }
            >
              <img src={ blackHeartIcon } alt="favorite-icon" />
            </button>
            <h2 data-testid="recipe-category" key={ strAlcoholic }>{strAlcoholic}</h2>
            <h2 data-testid="recipe-category" key={ strCategory }>{strCategory}</h2>
            <h3>Ingredients</h3>
            <ul>
              {
                ingredients.map((ingredient) => ingredient.map((item, index) => (
                  <li
                    key={ item }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${item} - ${measures[0][index]}`}
                  </li>
                )))
              }
            </ul>
            <p data-testid="instructions" key={ strInstructions }>{strInstructions}</p>
            {/* <div className="recomended-wrapper">
              <div className="recomended-drinks">
                { drinks.map((drink, indice) => (
                  DrinkRecomendationCard(drink, indice)
                ))}
              </div>
            </div> */}
            <button
              data-testid="start-recipe-btn"
              key={ i }
              type="button"
            >
              Iniciar receita
            </button>
          </div>))
      }
    </div>
  );
};

export default DrinkDetails;
