import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const responsive = {
  mobile: {
    breakpoint: { max: 360, min: 0 },
    items: 2,
  },
};

// mock de teste
// const doneRecipes = [{
//   id: 178319,
//   type: 'bebida',
//   area: '',
//   category: 'Cocktail',
//   alcoholicOrNot: 'Alcoholic',
//   name: 'Aquamarine',
//   image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//   doneDate: '23/6/2020',
//   tags: [],
// }];
// localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

// // mock de teste
// const inProgressRecipes = {
//   cocktails: {
//     178319: [],
//   },
// };
// localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

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
          <Image
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt="receita pronta"
            fluid
          />
          <h2 data-testid="recipe-title">{ item.strDrink }</h2>
          <Button
            variant="success"
            data-testid="share-btn"
            type="button"
          >
            Compartilhar

          </Button>
          <Button
            variant="success"
            data-testid="favorite-btn"
            type="button"
          >
            Add aos favoritos

          </Button>
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
                <Image src={ food.strMealThumb } alt={ food.strMeal } fluid />
              </div>
            )) }
          </Carousel>
          {/* { doneRecipes ? (
            <Button
              className="fixed-bottom"
              variant="success"
              data-testid="start-recipe-btn"
              type="button"
            >
              { inProgressRecipes ? 'Continuar Receita' : 'Iniciar Receita' }

            </Button>
          ) : '' } */}
        </div>
      )) }
    </>
  );
}

export default DrinksDetails;
