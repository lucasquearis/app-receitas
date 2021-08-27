import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  mobile: {
    breakpoint: { max: 360, min: 0 },
    items: 2,
  },
};

function DrinksDetails() {
  const [recipesDrink, setRecipesDrink] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recipesRecommendations, setRecipesRecommendations] = useState([]);

  useEffect(() => {
    const getRecipesDrink = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'; // alterar id
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRecipesDrink(drinks);
    };
    getRecipesDrink();
  }, []);

  useEffect(() => {
    const getIngredientsAndMeasures = () => {
      const key = Object.keys(recipesDrink[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = key
        .filter((item) => recipesDrink[0][item] !== '' && recipesDrink[0][item] !== null);
      const ingredientsList = ingredientNotEmpty
        .map((keyDrink) => recipesDrink[0][keyDrink]);
      setIngredients(ingredientsList);

      const keyMeasure = Object.keys(recipesDrink[0])
        .filter((item) => item.includes('strMeasure'));
      const measureNoEmpty = keyMeasure
        .filter((item) => recipesDrink[0][item] !== '' && recipesDrink[0][item] !== null);
      const measureList = measureNoEmpty.map((kMeasure) => recipesDrink[0][kMeasure]);
      setMeasure(measureList);
    };
    getIngredientsAndMeasures();
  }, [recipesDrink]);

  useEffect(() => {
    const getRecommendations = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      const maxRecommendations = 5;
      const recommendationList = [];
      for (let index = 0; index <= maxRecommendations; index += 1) {
        recommendationList.push(meals[index]);
      }
      setRecipesRecommendations(recommendationList);
    };
    getRecommendations();
  }, [recipesDrink]);

  return (
    <>
      { recipesDrink.map((item, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt="receita pronta"
          />
          <h2 data-testid="recipe-title">{ item.strDrink }</h2>
          <button data-testid="share-btn" type="button">Compartilhar</button>
          <button data-testid="favorite-btn" type="button">Add aos favoritos</button>
          <p data-testid="recipe-category">{ item.strAlcoholic }</p>
          <div>
            <h3>Ingredientes</h3>
            <ul>
              { ingredients.map((ingredient, indx) => (
                <li
                  key={ indx }
                  data-testid={ `${indx}-ingredient-name-and-measure` }
                >
                  { `${measure[indx]} ${ingredient}` }

                </li>
              )) }
            </ul>
          </div>
          <p data-testid="instructions">{ item.strInstructions }</p>
          <Carousel responsive={ responsive } slidesToSlide={ 2 }>
            { recipesRecommendations.map((food, ind) => (
              <div key={ food.strMeal } data-testid={ `${ind}-recomendation-card` }>
                <h2 data-testid={ `${ind}-recomendation-title` }>{food.strMeal }</h2>
                <img src={ food.strMealThumb } alt={ food.strMeal } />
              </div>
            )) }
          </Carousel>
          <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
        </div>
      )) }
    </>
  );
}

export default DrinksDetails;
