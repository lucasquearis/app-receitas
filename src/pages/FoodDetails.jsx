import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import useRedirect from '../hooks/useRedirect';

function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  const [recipeRender, setRecipeRender] = useState([]);
  const [loading, setloading] = useState(true);
  const { shouldRedirect, redirect } = useRedirect();
  const [drinksRecomendation, setdrinksRecomendation] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const results = await fetch(url).then((response) => response.json());
      setRecipeRender(results.meals);
    };
    fetchAPI();
    setloading(false);
  }, [id]);

  useEffect(() => {
    const fetchAPIDrinks = async () => {
      const SIX = 6;
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const results = await fetch(urlDrinks).then((response) => response.json());
      const firstSix = await results.drinks.slice(0, SIX);
      setdrinksRecomendation(firstSix);
    };
    fetchAPIDrinks();
    setloading(false);
  }, []);

  const ingredients = recipeRender.map((value) => Object.entries(value)
    .filter((ingredient) => ingredient[0]
      .includes('strIngredient') && ingredient[1] && ingredient[1].length
  && ingredient[1] !== null).map((item) => item[1]));

  const measures = recipeRender.map((value) => Object.entries(value)
    .filter((ingredient) => ingredient[0]
      .includes('strMeasure') && ingredient[1] && ingredient[1] !== ' '
      && ingredient[1] !== null).map((item) => item[1]));

  const ingredientsAndMeasures = ingredients
    .map((name, index) => ({ nome: name, quantidade: measures[index] }));

  if (loading) {
    return <h1>...carregando</h1>;
  }
  const ingredientsAndMeasuresList = (ingredientsAndMeasures && ingredientsAndMeasures
    .length && Object.values(ingredientsAndMeasures[0]));

  if (redirect.should) return <Redirect to={ redirect.path } />;

  return (
    <div>
      <h2>Detalhes</h2>
      {recipeRender.map((item) => (
        <div key={ v4() } className="details">
          <img
            alt="meal"
            key={ v4() }
            src={ item.strMealThumb }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-title">{item.strMeal}</p>

          <Button
            type="button"
            data-testid="share-btn"
          >
            Share
          </Button>

          <Button
            variant="danger"
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </Button>

          <p data-testid="recipe-category">{item.strCategory}</p>
          <ul>
            {ingredientsAndMeasuresList[0].map((ingredient, position) => (
              <li
                data-testid={ `${position}-ingredient-name-and-measure` }
                key={ v4() }
              >
                {ingredient}
                {ingredientsAndMeasuresList[1][position]}
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
              {drinksRecomendation.map((recomendation, position) => (
                <div
                  data-testid={ `${position}-recomendation-card` }
                  key={ v4() }
                >
                  <div
                    className="item"
                    data-testid={ `${position}-recomendation-title` }
                  >
                    {recomendation.strDrink}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="start"
            type="button"
            data-testid="start-recipe-btn"
            variant="success"
            onClick={ () => shouldRedirect(`/comidas/${item.idMeal}/in-progress`) }
          >
            Start
          </Button>
        </div>
      ))}
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodDetails;
