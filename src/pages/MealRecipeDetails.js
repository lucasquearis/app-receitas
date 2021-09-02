import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './pageCSS/MealRecipeDetails.css';
import { Link } from 'react-router-dom';
import searchMealAPI
  from '../services/Header-SearchBar/Foods/searchFoodId';
import RecomendationCard from '../components/RecomendationCard';
import Loading from '../components/Loading';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

export default function MealRecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const [resultMealRecipe, setResultMealRecipe] = useState([]);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [linkShare, setLinkShare] = useState(false);

  useEffect(() => {
    const resolveAPI = async () => {
      const { meals } = await searchMealAPI(id);
      setResultMealRecipe(meals);
    };
    resolveAPI();
  }, [id]);

  const continueRecipe = () => {
    const parseStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: { [id]: [] } };
    if (parseStorage.meals[id]) {
      return 'Continuar Receita';
    }
    return 'Iniciar Receita';
  };

  useEffect(() => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
  }, [id, favoriteRecipe]);

  if (resultMealRecipe && (resultMealRecipe.length > 0)) {
    const {
      strArea,
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions,
      strYoutube,
    } = resultMealRecipe[0];
    const splittedLink = strYoutube.split('v=');
    const embededLink = `https://www.youtube.com/embed/${splittedLink[1]}`;
    const keysIngredients = Object.keys(resultMealRecipe[0]);
    const listIngredients = keysIngredients.filter((item) => item
      .includes('strIngredient'));
    const listMeasures = keysIngredients.filter((item) => item.includes('strMeasure'));
    return (
      <>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <img
          className="cards"
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
        />
        <FavoriteButton
          id={ id }
          type="comida"
          category={ strCategory }
          alcoholicOrNot=""
          name={ strMeal }
          image={ strMealThumb }
          favoriteRecipe={ favoriteRecipe }
          setFavoriteRecipe={ setFavoriteRecipe }
          area={ strArea }
        />
        <ShareButton
          id={ id }
          setLinkShare={ setLinkShare }
          type="comidas"
        />
        { linkShare && 'Link copiado!' }
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
          height="360"
          src={ embededLink }
          frameBorder="0"
          allowFullScreen
        />
        <RecomendationCard page="meals" />
        <div className="div-btn-start-recipe">
          <Link to={ `/comidas/${id}/in-progress` }>
            <button
              className="finish-btn"
              data-testid="start-recipe-btn"
              type="button"
            >
              { continueRecipe() }
            </button>
          </Link>
        </div>
      </>
    );
  }
  return <Loading />;
}

MealRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;
