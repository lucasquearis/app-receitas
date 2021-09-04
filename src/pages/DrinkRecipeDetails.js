import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchDrinkId from '../services/Header-SearchBar/Drinks/searchDrinkId';
import RecomendationCard from '../components/RecomendationCard';
import Loading from '../components/Loading';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';

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

  if (resultDrinkRecipe && (resultDrinkRecipe.length > 0)) {
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
          <p data-testid="recipe-category"><b>{strAlcoholic}</b></p>
        </div>
        <div className="recipe-details__share-and-favorite-btn-div">
          <ShareButton
            id={ id }
            setLinkShare={ setLinkShare }
            type="bebidas"
          />
          { linkShare && 'Link copiado!' }
          <FavoriteButton
            id={ id }
            type="bebida"
            category={ strCategory }
            alcoholicOrNot={ strAlcoholic }
            name={ strDrink }
            image={ strDrinkThumb }
            favoriteRecipe={ favoriteRecipe }
            setFavoriteRecipe={ setFavoriteRecipe }
          />
        </div>
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
        <div className="details__div-btn-start-recipe">
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
  return (
    <Loading />
  );
}

DrinkRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;
