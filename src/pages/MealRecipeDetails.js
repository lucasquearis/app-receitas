import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import searchMealAPI
  from '../services/Header-SearchBar/Foods/searchFoodId';
import RecomendationCard from '../components/RecomendationCard';
import Loading from '../components/Loading';

export default function MealRecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const [resultMealRecipe, setResultMealRecipe] = useState([]);

  useEffect(() => {
    const resolveAPI = async () => {
      const { meals } = await searchMealAPI(id);
      setResultMealRecipe(meals);
    };
    resolveAPI();
  }, [id]);

  if (resultMealRecipe.length > 0) {
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
      strYoutube,
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
        <span>Categoria: </span>
        <span data-testid="recipe-category">{strCategory}</span>
        <ul>
          {listIngredients.map((ingredient, index) => {
            if (resultMealRecipe[0][ingredient]) {
              return (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { resultMealRecipe[0][ingredient] }
                  {' '}
                  -
                  {' '}
                  {resultMealRecipe[0][listMeasures[index]]}
                </li>
              );
            }
            return false;
          })}
        </ul>
        <h2>Instruções:</h2>
        <p data-testid="instructions">{strInstructions}</p>
        <iframe
          data-testid="video"
          title="Video da receita"
          width="360"
          height="640"
          src={ strYoutube }
          frameBorder="0"
          allowFullScreen
        />
        <RecomendationCard page="meals" />
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </>
    );
  }

  return <Loading />;
}

MealRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;
