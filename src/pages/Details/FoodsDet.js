import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams, Link } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';

const responsive = {
  mobile: {
    breakpoint: { max: 360, min: 0 },
    items: 2,
  },
};

function FoodDetails() {
  const [recipesFood, setRecipesFood] = useState([{}]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recipesRecommendations, setRecipesRecommendations] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getRecipesFood = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipesFood(meals);
    };
    getRecipesFood();
  }, [id]);

  useEffect(() => {
    const getIngredients = () => {
      const key = Object.keys(recipesFood[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = key
        .filter((item) => recipesFood[0][item] !== '' && recipesFood[0][item] !== null);
      const ingredientsList = ingredientNotEmpty
        .map((keyFood) => recipesFood[0][keyFood]);
      setIngredients(ingredientsList);

      const keyMeasure = Object.keys(recipesFood[0])
        .filter((item) => item.includes('strMeasure'));
      const measureNoEmpty = keyMeasure
        .filter((item) => recipesFood[0][item] !== '' && recipesFood[0][item] !== null);
      const measureList = measureNoEmpty.map((kMeasure) => recipesFood[0][kMeasure]);
      setMeasure(measureList);
    };
    getIngredients();
  }, [recipesFood]);

  useEffect(() => {
    const getRecommendations = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      const maxRecommendations = 5;
      const recommendationList = [];
      for (let index = 0; index <= maxRecommendations; index += 1) {
        recommendationList.push(drinks[index]);
      }
      setRecipesRecommendations(recommendationList);
    };
    getRecommendations();
  }, [recipesFood]);

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterDoneRecipes = getDoneRecipes ? getDoneRecipes
      .filter((item) => item.id === parseInt(id, 10)) : [];
    setDoneRecipes(filterDoneRecipes);

    const getInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const filterInProgress = getInProgress ? Object.keys(getInProgress.meals)
      .filter((item) => item === id) : [];
    setInProgress(filterInProgress);
  }, [id, setDoneRecipes]);

  return (
    <>
      <h1>Tela de detalhes</h1>
      { recipesFood.map((item, index) => (
        <div key={ index }>
          <Image
            data-testid="recipe-photo"
            src={ item.strMealThumb }
            alt="receita pronta"
            fluid
          />
          <h2 data-testid="recipe-title">{ item.strMeal }</h2>
          <p data-testid="recipe-category">{ item.strCategory }</p>
          <ShareButton />
          <FavoriteButton
            infos={ {
              id,
              type: 'comida',
              area: item.strArea,
              category: item.strCategory,
              alcoholicOrNot: '',
              name: item.strMeal,
              image: item.strMealThumb,
              // doneDate,
              // tags
            } }
          />
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
          <iframe
            title="food-video"
            data-testid="video"
            width="10"
            height="10"
            src={ item.strYoutube }
          />
          <Carousel responsive={ responsive } slidesToSlide={ 2 }>
            { recipesRecommendations.map((food, ind) => (
              <div key={ food.strDrink } data-testid={ `${ind}-recomendation-card` }>
                <h2 data-testid={ `${ind}-recomendation-title` }>{food.strDrink }</h2>
                <Image src={ food.strDrinkThumb } alt={ food.strDrink } fluid />
              </div>
            )) }
          </Carousel>
          <Link to={ `/comidas/${id}/in-progress` }>
            <Button
              className="fixed-bottom"
              data-testid="start-recipe-btn"
              type="button"
              hidden={ doneRecipes.length !== 0 }
            >
              { inProgress.length !== 0
                ? 'Continuar Receita' : 'Iniciar Receita' }
            </Button>
          </Link>
        </div>
      )) }
    </>
  );
}

export default FoodDetails;
