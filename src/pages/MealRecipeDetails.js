import React, { useEffect, useState } from 'react';
import './pageCSS/MealRecipeDetails.css';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import searchMealAPI from '../services/Header-SearchBar/Foods/searchFoodId';
import RecomendationCard from '../components/RecomendationCard';
import Loading from '../components/Loading';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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

  const handleclickFavButton = (area = '', category, name, image) => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
    if (!favoriteRecipe) {
      const defaultRecipe = {
        id,
        type: 'comida',
        area,
        category,
        alcoholicOrNot: '',
        name,
        image,
      };
      setFavoriteRecipe(true);
      console.log('Favoritou');
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify([...parseLocalStorage, defaultRecipe]));
    } else {
      const removeFavorite = parseLocalStorage.filter((recipe) => recipe.id !== id);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify([...removeFavorite]));
      setFavoriteRecipe(false);
      console.log('Desfavoritou');
    }
  };

  if (resultMealRecipe.length > 0) {
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
      <div className="recipe-details__div">
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <img
          className="recipe-details__thumb"
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ strMeal }
        />
        <div className="recipe-details__category-name-div">
          <span><b>Categoria: </b></span>
          <span data-testid="recipe-category">{strCategory}</span>
        </div>
        <div className="recipe-details__share-and-favorite-btn-div">
          <button
            className="favorite-btn"
            type="button"
            onClick={
              () => handleclickFavButton(strArea, strCategory, strMeal, strMealThumb)
            }
          >
            <img
              data-testid="favorite-btn"
              src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
              alt="icone favorito"
            />
          </button>
          <button
            className="share-btn"
            data-testid="share-btn"
            onClick={ () => {
              copy(`http://localhost:3000/comidas/${id}`);
              setLinkShare(true);
            } }
            type="button"
          >
            <img
              src={ shareIcon }
              alt="imagem de compartilhar"
            />
          </button>
        </div>
        { linkShare && 'Link copiado!' }
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
        <h2>Instruções</h2>
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
        <h2 className="recipe-details__combine-title">Combina com...</h2>
        <RecomendationCard page="meals" />
        <div className="div-btn-start-recipe">
          <Link to={ `/comidas/${id}/in-progress` }>
            <button
              className="recipe-details__finish-btn"
              data-testid="start-recipe-btn"
              type="button"
            >
              { continueRecipe() }
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return <Loading />;
}

MealRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;
