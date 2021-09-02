import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/Details.css';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import DetailsShareFaveBtns from '../components/DetailsShareFaveBtns';

export default function MealDetails(props) {
  const [mealDetails, setMealDetails] = useState({});
  const [drinksRecommended, setDrinksRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { recipesInProgress, setRecipesInProgress } = useContext(Context);

  useEffect(() => {
    const { match: { params: { id } } } = props;
    const endpointDetails = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const endpointRecomendations = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const fetchDetails = async () => {
      const { meals } = await fetch(endpointDetails).then((data) => data.json());
      setMealDetails(meals);
      setIsLoading(false);
    };
    const fetchRecomendations = async () => {
      const SIX = 6;
      const { drinks } = await fetch(endpointRecomendations)
        .then((data) => data.json());
      const filteredDrinks = drinks.filter((_drink, index) => index < SIX);
      setDrinksRecommended(filteredDrinks);
    };
    fetchDetails();
    fetchRecomendations();
  }, [props]);

  useEffect(() => {
    const actualLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!actualLocalStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }, [recipesInProgress]);

  function handleStartRecipe() {
    const { match: { params: { id } } } = props;
    const recipesObject = {
      ...recipesInProgress,
      meals: {
        ...recipesInProgress.meals,
        [id]: [],
      },
    };
    setRecipesInProgress({ ...recipesObject });
    const actualLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...actualLocalStorage,
      meals: {
        ...actualLocalStorage.meals,
        [id]: [],
      },
    }));
  }

  function verifyIfRecipeInProgress() {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealsIds = Object.keys(inProgressRecipes.meals);
    const isThisRecipeInProgress = mealsIds
      .some((id) => id === props.match.params.id);
    return isThisRecipeInProgress;
  }

  // source: https://stackoverflow.com/a/21607897, tks!
  function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const ELEVEN = 11;
    return (match && match[2].length === ELEVEN)
      ? match[2]
      : null;
  }

  function modifyDetailProp() {
    const obj = {
      id: mealDetails[0].idMeal,
      type: 'comida',
      area: mealDetails[0].strArea,
      category: mealDetails[0].strCategory,
      alcoholicOrNot: '',
      name: mealDetails[0].strMeal,
      image: mealDetails[0].strMealThumb,
    };
    return obj;
  }

  function renderDetails() {
    const details = mealDetails[0];
    const allKeys = (Object.keys(details));
    const ingredientKeys = allKeys.filter((key) => key.includes('strIngredient'));
    const validIngredientKeys = ingredientKeys.filter(
      (key) => !(details[key] === '' || !details[key]),
    );
    const measuresKeys = allKeys.filter((key) => key.includes('strMeasure'));
    const validMeasuresKeys = measuresKeys.filter(
      (key) => !(details[key] === '' || !details[key]),
    );

    return (
      <main>
        <img
          data-testid="recipe-photo"
          alt="imagem da receita"
          src={ details.strMealThumb }
        />
        <div className="title-and-btns">
          <h1 data-testid="recipe-title">{ details.strMeal }</h1>
          <DetailsShareFaveBtns details={ modifyDetailProp() } />
        </div>
        <p data-testid="recipe-category">{ details.strCategory }</p>
        {
          validIngredientKeys.map((key, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ key }
            >
              { details[key] }
              :
              &nbsp;
              { details[validMeasuresKeys[index]] }
            </p>
          ))
        }
        <p data-testid="instructions">{ details.strInstructions }</p>
        <div data-testid="video">
          <iframe
            title="recipe title"
            width="420"
            height="315"
            src={ `https://youtube.com/embed/${getYouTubeId(details.strYoutube)}` }
          />
        </div>
        <h3>Recomendações para acompanhar essa receita</h3>
        <Carousel>
          {
            drinksRecommended.map((drink, index) => (
              <Carousel.Item key={ drink.strDrink }>
                <div
                  className="d-block w-100"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <p data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</p>
                </div>
              </Carousel.Item>
            ))
          }
        </Carousel>
        <div className="button-wrapper">
          <Link to={ `/comidas/${props.match.params.id}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleStartRecipe }
            >
              { verifyIfRecipeInProgress() ? 'Continuar Receita' : 'Iniciar Receita' }
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    isLoading ? <p>Loading...</p> : renderDetails()
  );
}

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
