import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';
import jacare from '../images/jacare.png';
import IngredientsList from '../components/IngredientsList';
import Recomendations from '../components/Recomendations';
import StartRecipeButton from '../components/StartRecipeButton';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import '../styles/RecipeDetails.css';

function RecipeDetails(props) {
  const { match, history } = props;
  const { type, id } = match.params;
  const [recipe, setRecipe] = useState();
  const [enType, setEnType] = useState(type === 'comidas' ? 'meals' : 'drinks');
  const [enCasedType, setEnCasedType] = useState('Drink');
  const [favoriteType, setFavoriteType] = useState('bebida');
  const { pathname } = history.location;
  const YOUTUBE_ID_START = 32;
  const YOUTUBE_ID_END = 64;

  const getRecipe = async () => {
    let endpoint = '';
    if (type === 'comidas') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setEnType('meals');
      setEnCasedType('Meal');
      setFavoriteType('comida');
    } else {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    await fetch(endpoint)
      .then((data) => data.json())
      .then((response) => {
        setRecipe(response);
      });
  };

  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    getRecipe();
  }, [props]);

  return (
    <div>
      {
        recipe && recipe[enType] && recipe[enType][0]
          ? (
            <div>
              <div className="images">
                <img
                  src={ recipe[enType][0][`str${enCasedType}Thumb`] }
                  alt="Foto do Prato"
                  data-testid="recipe-photo"
                  className="recipe-image"
                />
                <img
                  className="jacare-img"
                  src={ jacare }
                  alt="jacaré"
                />
              </div>
              <h1
                data-testid="recipe-title"
              >
                { recipe[enType][0][`str${enCasedType}`] }
              </h1>
              <div className="buttons">
                <ShareButton pathname={ pathname } />
                <FavoriteButton
                  recipe={
                    { id,
                      type: favoriteType,
                      area: recipe[enType][0].strArea || '',
                      category: recipe[enType][0].strCategory,
                      alcoholicOrNot: recipe[enType][0].strAlcoholic || '',
                      name: recipe[enType][0][`str${enCasedType}`],
                      image: recipe[enType][0][`str${enCasedType}Thumb`] }
                  }
                  testId="favorite-btn"
                />
              </div>
              <h2 data-testid="recipe-category">
                { type === 'comidas'
                  ? recipe[enType][0].strCategory
                  : recipe[enType][0].strAlcoholic }
              </h2>
              <ul>
                <IngredientsList recipe={ recipe[enType][0] } />
              </ul>
              <p data-testid="instructions">{ recipe[enType][0].strInstructions }</p>
              {
                type === 'comidas' && recipe[enType][0].strYoutube
                && (
                  <iframe
                    className="video"
                    title="Video"
                    data-testid="video"
                    src={
                      `https://www.youtube.com/embed/${recipe[enType][0].strYoutube.slice(YOUTUBE_ID_START, YOUTUBE_ID_END)}`
                    }
                  />
                )
              }
              <h3>Recomendações</h3>
              {
                recipe && <Recomendations type={ type } />
              }
              <StartRecipeButton
                id={ id }
                type={ type }
                enType={ enType }
              />
            </div>
          )
          : (
            <object
              className="rocksGlass"
              type="image/svg+xml"
              data={ rockGlass }
            >
              Glass
            </object>
          )
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.arrayOf([
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ]).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
