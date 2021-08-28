import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import searchMealAPI
  from '../services/Header-SearchBar/Foods/searchFoodId';

export default function MealRecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const [resultRecipe, setResultRecipe] = useState([]);

  useEffect(() => {
    const resolveAPI = async () => {
      const { meals } = await searchMealAPI(id);
      setResultRecipe(meals);
    };
    resolveAPI();
  }, [id]);

  if (resultRecipe.length > 0) {
    const {
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
      strYoutube,
    } = resultRecipe[0];
    const keysIngredients = Object.keys(resultRecipe[0]);
    const listIngredients = keysIngredients.filter((item) => item
      .includes('strIngredient'));
    return (
      <>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <span>Categoria: </span>
        <span data-testid="recipe-category">{strCategory}</span>
        <ul>
          {listIngredients.map((igredient, index) => {
            if (resultRecipe[0][igredient] !== '') {
              return (
                <li
                  key={ igredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { resultRecipe[0][igredient] }
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
        <p>Receitas recomendadas</p>
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </>
    );
  }

  return <h1>Loading...</h1>;
}

MealRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;
