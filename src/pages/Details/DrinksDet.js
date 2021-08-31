import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useParams } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import ShareButton from '../../components/Details/ShareButton';
import FavoriteButton from '../../components/Details/FavoriteButton';

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
  const { id } = useParams();

  useEffect(() => {
    const getRecipesDrink = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRecipesDrink(drinks);
    };
    getRecipesDrink();
  }, [id]);

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

  const localStorageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
    .filter((item) => item.id === id);

  const localStorageInProgressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes'));
  const filterProgressRecipes = Object.keys(localStorageInProgressRecipes.drinks)
    .filter((item) => parseInt(item, 10) === id);

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
          <p data-testid="recipe-category">{ item.strAlcoholic }</p>
          <ShareButton />
          <FavoriteButton />
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
          { !localStorageDoneRecipes.length !== 0 ? (
            <Link to={ `/bebidas/${id}/in-progress` }>
              <Button
                className="fixed-bottom"
                variant="success"
                data-testid="start-recipe-btn"
                type="button"
              >
                { filterProgressRecipes.length !== 0
                  ? 'Continuar Receita' : 'Iniciar Receita' }

              </Button>
            </Link>
          ) : '' }
        </div>
      )) }
    </>
  );
}

export default DrinksDetails;
