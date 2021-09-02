import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import renderRecomendationCard from '../service/RecomendationCards';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/ComidasDetails.css';

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
      const response = await fetch(URL);
      const data = await response.json();
      setDrink(data.drinks[0]);
    };
    getMeal();
    const getRecomendations = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(URL);
      const data = await response.json();
      setMeals(data.meals);
    };
    getRecomendations();
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setShare(true);
  };

  const link = (
    <Link
      data-testid="start-recipe-btn"
      to={ `/bebidas/${id}/in-progress` }
      className="details-button btn btn-info"
    >
      {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </Link>
  );

  return (
    <main className="d-flex flex-column">
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt="imagem do prato"
          className="image-details-comida"
        />
      </div>
      <div className="d-flex justify-content-between">
        <h1 data-testid="recipe-title">{drink.strDrink}</h1>
        <div className="button-container-details">
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
            onClick={ () => favoritingRecipe(isFav, setIsFav, id, drink, 'Drink') }
            type="button"
          >
            <img
              src={ isFav ? blackHeartIcon : whiteHeartIcon }
              alt="imagem de favoritar"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </div>
      <p
        data-testid="recipe-category"
        className="category-details-comidas"
      >
        {drink.strAlcoholic}
      </p>
      <div className="ingredients-details">
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
      <div className="ingredients-details">
        <h3>Recomendadas</h3>
        <div className="recomendations-container">
          { renderRecomendationCard(meals, 'Meal', 'comidas').map((recipe) => recipe) }
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
