import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ShareBtn from '../components/ShareBtn';
import useRedirect from '../hooks/useRedirect';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import fuctionSetFavorite from '../utils/functionSetFavorite';
import functionRenderRecipe from '../utils/functionRenderRecipe';

function DrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const [recipeRender, setRecipeRender] = useState([]);
  const [loading, setloading] = useState(true);
  const { shouldRedirect, redirect } = useRedirect();
  const [mealsRecomendation, setmealsRecomendation] = useState([]);
  const [heartColor, setHeartColor] = useState(false);
  const [start, setStart] = useState(true);

  useEffect(() => {
    setloading(true);
    const fetchAPI = async () => {
      const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(END_POINT);
      const { drinks } = await response.json();
      setRecipeRender(drinks);
    };
    fetchAPI();
    setloading(false);
  }, [id]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (favoriteRecipes.some((item) => item.id === id)) {
      setHeartColor(true);
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes && inProgressRecipes.cocktails[id]) {
      setStart(false);
    }
  }, [id]);

  useEffect(() => {
    setloading(true);
    const fetchAPIMeals = async () => {
      const SIX = 6;
      const urlDrinks = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const results = await fetch(urlDrinks).then((response) => response.json());
      const firstSix = await results.meals.slice(0, SIX);
      setmealsRecomendation(firstSix);
    };
    fetchAPIMeals();
    setloading(false);
  }, []);

  if (loading) {
    return <h1>...carregando</h1>;
  }

  if (redirect.should) {
    return <Redirect to={ redirect.path } />;
  }

  return (
    <div>
      <h2>Detalhes</h2>
      {!recipeRender ? 'loading'
        : recipeRender.map((item) => (
          <div key={ v4() } className="details">
            <img
              alt="drink"
              key={ v4() }
              src={ item.strDrinkThumb }
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-title">{item.strDrink}</p>

            <ShareBtn id={ id } type="bebida" className="btn-share" />

            <Button
              variant="danger"
              type="button"
              className="favorite-btn"
              onClick={ () => fuctionSetFavorite(recipeRender, id, setHeartColor) }
            >
              <img
                id="fav-btn"
                src={ heartColor ? blackHeartIcon : whiteHeartIcon }
                alt="favoritar"
                data-testid="favorite-btn"
                className="favorite-img"
              />
            </Button>

            <p data-testid="recipe-category">{item.strAlcoholic}</p>
            <ul>
              {functionRenderRecipe(recipeRender)[0].map((ingredient, position) => (
                <li
                  data-testid={ `${position}-ingredient-name-and-measure` }
                  key={ v4() }
                >
                  {ingredient}
                  {functionRenderRecipe(recipeRender)[1][position]}
                </li>))}
            </ul>
            <p data-testid="instructions">{item.strInstructions}</p>
            <iframe
              src={ item.strYoutube }
              title="title"
              data-testid="video"
            />

            <div className="items-wrapper">
              <div className="items">
                {mealsRecomendation.map((recomendation, position) => (
                  <div
                    data-testid={ `${position}-recomendation-card` }
                    key={ v4() }
                  >
                    <div
                      className="item"
                      data-testid={ `${position}-recomendation-title` }
                    >
                      {recomendation.strMeal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              className="start"
              variant="success"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => shouldRedirect(`/bebidas/${item.idDrink}/in-progress`) }
            >
              { start ? 'Start' : 'Continuar Receita' }
            </Button>
          </div>
        ))}
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
