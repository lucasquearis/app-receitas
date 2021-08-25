import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function BebidasDetails(props) {
  const { match: { params: { id } } } = props;

  const {
    favoritingRecipe,
    renderingIngredients,
    verifyingRecipe,
  } = useContext(RecipesContext);

  const { favorite, done, inProgress } = verifyingRecipe(id, 'meals');

  const [drink, setDrink] = useState({});
  const [isFav, setIsFav] = useState(favorite);
  const [meals, setMeals] = useState([]);

  const { ingredients, measures } = renderingIngredients(drink);

  useEffect(() => {
    const getMeal = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setDrink(data.drinks[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getMeal();
    const getRecomendations = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.log(error);
      }
    };
    getRecomendations();
  }, [id]);

  const renderRecomendationCard = () => {
    const SIX = 6;
    const links = [];
    if (meals.length > 0) {
      for (let index = 0; index < SIX; index += 1) {
        links.push(
          <Link
            to={ `/bebidas/${meals[index].idMeal}` }
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <div>
              <img
                src={ meals[index].strMealThumb }
                alt={ meals[index].strMeal }
              />
              <p>{meals[index].strCategory}</p>
              <p>{meals[index].strMeal}</p>
            </div>
          </Link>,
        );
      }
    }
    return links;
  };

  const link = (
    <Link
      data-testid="start-recipe-btn"
      to={ `/comidas/${id}/in-progress` }
    >
      {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </Link>
  );

  return (
    <main>
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt="imagem do prato"
        />
      </div>
      <div>
        <h1 data-testid="recipe-title">{drink.strDrink}</h1>
        <div>
          <img
            src={ shareIcon }
            alt="imagem de compartilhar"
            data-testid="share-btn"
          />
          <button
            onClick={ () => favoritingRecipe(isFav, setIsFav, id, drink) }
            type="button"
          >
            <img
              src={ isFav ? blackHeartIcon : whiteHeartIcon }
              alt="imagem de favoritar"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        <p data-testid="recipe-category">{drink.strAlcoolic}</p>
        <div>
          <h3>Ingredients</h3>
          <ul>
            {
              ingredients
                .map((ingredient, index) => (
                  <li key={ ingredient }>
                    { `${ingredient} - ${measures[index]}`}
                  </li>))
            }
          </ul>
        </div>
        <div>
          <h3>Instructions</h3>
          <p data-testid="instructions">{ drink.strInstructions }</p>
        </div>
        <div>
          <h3>Recomendadas</h3>
          <div>
            { renderRecomendationCard().map((recipe) => recipe) }
          </div>
        </div>
        { !done && link }
      </div>
    </main>
  );
}

BebidasDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default BebidasDetails;
