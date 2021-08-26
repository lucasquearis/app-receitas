import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import renderRecomendationCard from '../service/RecomendationCards';
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

  const { favorite, done, inProgress } = verifyingRecipe(id, 'cocktails');

  const [drink, setDrink] = useState({});
  const [isFav, setIsFav] = useState(favorite);
  const [meals, setMeals] = useState([]);
  const [share, setShare] = useState(false);
  const location = useLocation();

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

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setShare(true);
  };

  if (share) {
    const threeSeconds = 3000;
    setTimeout(() => {
      setShare(false);
    }, threeSeconds);
  }

  const link = (
    <Link
      data-testid="start-recipe-btn"
      to={ `/bebidas/${id}/in-progress` }
      className="details-button"
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
          <button
            onClick={ handleShare }
            type="button"
          >
            <img
              src={ shareIcon }
              alt="imagem de compartilhar"
              data-testid="share-btn"
            />
          </button>
          { share && <p>Link copiado!</p> }
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
        <p data-testid="recipe-category">{drink.strAlcoholic}</p>
        <div>
          <h3>Ingredients</h3>
          <ul>
            {
              ingredients
                .map((ingredient, index) => (
                  <li
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
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
            { renderRecomendationCard(meals, 'Meal').map((recipe) => recipe) }
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
