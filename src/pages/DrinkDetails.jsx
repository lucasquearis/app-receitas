import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import '../styles/Details.css';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import DetailsShareFaveBtns from '../components/DetailsShareFaveBtns';

export default function DrinkDetails(props) {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [mealsRecommended, setMealsRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { recipesInProgress, setRecipesInProgress } = useContext(Context);
  useEffect(() => {
    const { match: { params: { id } } } = props;
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const endpointRecomendations = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const fetchDetails = async () => {
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setDrinkDetails(drinks);
      setIsLoading(false);
    };
    const fetchRecomendations = async () => {
      const SIX = 6;
      const { meals } = await fetch(endpointRecomendations)
        .then((data) => data.json());
      const filteredMeals = meals.filter((_meal, index) => index < SIX);
      setMealsRecommended(filteredMeals);
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
      cocktails: {
        ...recipesInProgress.cocktails,
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
    const cocktailsIds = Object.keys(inProgressRecipes.cocktails);
    const isThisRecipeInProgress = cocktailsIds
      .some((id) => id === props.match.params.id);
    return isThisRecipeInProgress;
  }

  function renderDetails() {
    const details = drinkDetails[0];
    const allKeys = (Object.keys(details));
    const ingredientKeys = allKeys.filter((key) => key.includes('strIngredient'));
    const validIngredientKeys = ingredientKeys.filter(
      (key) => !(details[key] === '' || !details[key]),
    );
    const measuresKeys = allKeys.filter((key) => key.includes('strMeasure'));
    const validMeasuresKeys = measuresKeys.filter(
      (key) => !(details[key] === '' || !details[key]),
    );

    function modifyDetailProp() {
      const obj = {
        id: drinkDetails[0].idDrink,
        type: 'bebida',
        area: '',
        category: drinkDetails[0].strCategory,
        alcoholicOrNot: drinkDetails[0].strAlcoholic,
        name: drinkDetails[0].strDrink,
        image: drinkDetails[0].strDrinkThumb,
      };
      return obj;
    }

    return (
      <main>
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
          alt="imagem da receita"
          src={ details.strDrinkThumb }
        />
        <div className="title-and-btns">
          <h1 data-testid="recipe-title">{ details.strDrink }</h1>
          <DetailsShareFaveBtns details={ modifyDetailProp() } />
        </div>
        <p data-testid="recipe-category">{ details.strAlcoholic }</p>
        {
          validIngredientKeys.map((key, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ key }
            >
              { details[key] }
              :
              &nbsp;
              {
                !details[validMeasuresKeys[index]]
                  ? 'à gosto' : details[validMeasuresKeys[index]]
              }
            </p>
          ))
        }
        <p data-testid="instructions">{ details.strInstructions }</p>
        <h3>Recomendações para acompanhar esse drink</h3>
        <Carousel>
          {
            mealsRecommended.map((meal, index) => (
              <Carousel.Item key={ meal.idMeal }>
                <div
                  className="d-block w-100"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <p data-testid={ `${index}-recomendation-title` }>{ meal.strMeal }</p>
                </div>
              </Carousel.Item>
            ))
          }
        </Carousel>
        <div className="button-wrapper-details">
          <Link to={ `/bebidas/${props.match.params.id}/in-progress` }>
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

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
