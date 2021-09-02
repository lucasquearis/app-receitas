import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';
import IngredientsList from '../components/IngredientsList';
import Suggestions from '../components/Suggestions';
import StartRecipeButton from '../components/StartRecipeButton';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Iframe from '../components/Iframe';
import '../styles/ItemCard.css';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState();
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const [enType, setEnType] = useState('drinks');
  const [enCasedType, setEnCasedType] = useState('Drink');
  const [favoriteType, setFavoriteType] = useState('bebida');
  const { match } = props;
  const { type, id } = match.params;
  const localhost = 'http://localhost:3000/';

  useEffect(() => {
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
    getRecipe();
  }, []);

  useEffect(() => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
  }, [id, favoriteRecipe]);

  return (
    <div>
      {
        recipe
          ? (
            <section className="section-card">
              <img
                className="card-img"
                src={ recipe[enType][0][`str${enCasedType}Thumb`] }
                alt="Foto do Prato"
                data-testid="recipe-photo"
              />

              <h1
                className="card-title"
                data-testid="recipe-title"
              >
                { recipe[enType][0][`str${enCasedType}`] }
              </h1>

              <ShareButton pathname={ `${localhost}${favoriteType}s/${id}` } />

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
                favoriteRecipe={ favoriteRecipe }
                setFavoriteRecipe={ setFavoriteRecipe }
              />

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
                type === 'comidas'
                && <Iframe link={ recipe[enType][0].strYoutube } />
              }

              { recipe && <Suggestions type={ type } /> }

              <StartRecipeButton
                id={ id }
                type={ type }
                enType={ enType }
              />
            </section>
          )
          : (
            <object
              className="rockGlass"
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
      type: PropTypes.string,
      id: PropTypes.string,
    }),
  ]),
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
