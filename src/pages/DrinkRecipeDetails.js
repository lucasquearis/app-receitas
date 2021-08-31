import React, { useState, useEffect } from 'react';
import './pageCSS/DrinkRecipeDetails.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchDrinkId from '../services/Header-SearchBar/Drinks/searchDrinkId';
import RecomendationCard from '../components/RecomendationCard';
import Loading from '../components/Loading';

function DrinkRecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const [resultDrinkRecipe, setResultDrinkRecipe] = useState([]);

  useEffect(() => {
    const resolveAPI = async () => {
      const { drinks } = await searchDrinkId(id);
      setResultDrinkRecipe(drinks);
    };
    resolveAPI();
  }, [id]);

  if (resultDrinkRecipe.length > 0) {
    const {
      strDrink,
      strDrinkThumb,
      strInstructions,
      strAlcoholic,
    } = resultDrinkRecipe[0];
    const keysIngredients = Object.keys(resultDrinkRecipe[0]);
    const listIngredients = keysIngredients.filter((item) => item
      .includes('strIngredient'));
    const listMeasures = keysIngredients.filter((item) => item.includes('strMeasure'));
    return (
      <>
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <p data-testid="recipe-category">{strAlcoholic}</p>
        <ul>
          {listIngredients.map((ingredient, index) => {
            if (resultDrinkRecipe[0][ingredient]) {
              return (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { resultDrinkRecipe[0][ingredient] }
                  {' '}
                  -
                  { resultDrinkRecipe[0][listMeasures[index]] }
                </li>
              );
            }
            return false;
          })}
        </ul>
        <h2>Instruções:</h2>
        <p data-testid="instructions">{strInstructions}</p>
        <RecomendationCard page="drinks" />
        <Link to={ `/bebidas/${id}/in-progress` }>
          <button
            data-testid="start-recipe-btn"
            type="button"
          >
            Iniciar Receita
          </button>
        </Link>
      </>
    );
  }

  return (
    <Loading />
  );
}

DrinkRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default DrinkRecipeDetails;
