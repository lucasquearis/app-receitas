import React, { useState, useEffect } from 'react';
import './pageCSS/DrinkRecipeDetails.css';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import searchDrinkId from '../services/Header-SearchBar/Drinks/searchDrinkId';
import RecomendationCard from '../components/RecomendationCard';
import Loading from '../components/Loading';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DrinkRecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const [resultDrinkRecipe, setResultDrinkRecipe] = useState([]);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [linkShare, setLinkShare] = useState(false);

  useEffect(() => {
    const resolveAPI = async () => {
      const { drinks } = await searchDrinkId(id);
      setResultDrinkRecipe(drinks);
    };
    resolveAPI();
  }, [id]);

  const continueRecipe = () => {
    const parseStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] } };
    if (parseStorage.cocktails[id]) {
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

  const handleFavButton = (alcoholicOrNot, name, image, category = '') => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
    if (!favoriteRecipe) {
      const defaultRecipe = {
        id,
        type: 'bebida',
        area: '',
        category,
        alcoholicOrNot,
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

  if (resultDrinkRecipe.length > 0) {
    const {
      strDrink,
      strDrinkThumb,
      strInstructions,
      strAlcoholic,
      strCategory,
    } = resultDrinkRecipe[0];
    const keysIngredients = Object.keys(resultDrinkRecipe[0]);
    const listIngredients = keysIngredients.filter((item) => item
      .includes('strIngredient'));
    const listMeasures = keysIngredients.filter((item) => item.includes('strMeasure'));
    return (
      <div className="recipe-details__div">
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <img
          className="recipe-details__thumb"
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt={ strDrink }
        />
        <div className="recipe-details__category-name-div">
          <span><b>Álcool: </b></span>
          <span data-testid="recipe-category">{strAlcoholic}</span>
        </div>
        <div className="recipe-details__share-and-favorite-btn-div">
          <button
            className="favorite-btn"
            type="button"
            onClick={
              () => handleFavButton(strAlcoholic, strDrink, strDrinkThumb, strCategory)
            }
          >
            <img
              data-testid="favorite-btn"
              src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
              alt="icone favorito"
            />
          </button>
          <button
            data-testid="share-btn"
            className="share-btn"
            onClick={ () => {
              copy(`http://localhost:3000/bebidas/${id}`);
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
            if (resultDrinkRecipe[0][ingredient]) {
              return (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { resultDrinkRecipe[0][ingredient] }
                  {' '}
                  -
                  { resultDrinkRecipe[0][listMeasures[index]] }
                </li>
              );
            }
            return false;
          })}
        </ul>
        <h2>Instruções:</h2>
        <p data-testid="instructions">{strInstructions}</p>
        <h2 className="recipe-details__combine-title">Combina com...</h2>
        <RecomendationCard page="drinks" />
        <div className="div-btn-start-recipe">
          <Link to={ `/bebidas/${id}/in-progress` }>
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

  return (<Loading />);
}

DrinkRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;
