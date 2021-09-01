import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
// import Carousel from 'react-elastic-carousel';
import copy from 'clipboard-copy';
import Button from '@material-ui/core/Button';
import shareIcon from '../images/shareIcon.svg';
import RecomendedCard from '../components/RecomendedCard';
import bHIcon from '../images/blackHeartIcon.svg';
import wHIcon from '../images/whiteHeartIcon.svg';

function DrinkDetails({ match: { params: { id } } }) {
  const [drink, setDrink] = useState({});
  const [recomendedFood, setRecomendedFood] = useState([]);
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions, strCategory } = drink;
  const [ingredientList, setIngredientList] = useState([]);
  const location = useLocation();
  const [share, setShare] = useState(false);
  const [visible, setVisible] = useState([false, false, true, true, true, true]);
  const mystyle = {
    bottom: '0px',
    position: 'fixed',
  };

  const imgStyle = {
    width: '300px',
  };
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [continueRecipe, setContinueRecipe] = useState('Iniciar Receita');
  const [favorite, setFavorite] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(wHIcon);

  const fetchRecomendedFood = async () => {
    const endPointRecomendedFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(endPointRecomendedFood);
    const response = await request.json();
    setRecomendedFood(response.meals);
  };

  const renderRecomendedFood = () => {
    const SEIS = 6;
    const sliceRecomended = recomendedFood.slice(0, SEIS);
    if (sliceRecomended.length > 0) {
      return (
        <ul>
          {sliceRecomended.map((meal, index) => (
            <RecomendedCard
              title={ meal.strMeal }
              key={ meal.idMeal }
              id={ meal.idMeal }
              index={ index }
              img={ meal.strMealThumb }
              visible={ visible[index] }
            />
          ))}
        </ul>
      );
    }
  };

  useEffect(() => {
    const fetchDrinkById = async () => {
      const endPointDrinkById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const request = await fetch(endPointDrinkById);
      const response = await request.json();
      setDrink(response.drinks[0]);
    };
    fetchDrinkById();
    fetchRecomendedFood();
    setVisible([false, false, true, true, true, true]);
  }, [id]);

  useEffect(() => {
    const ingredientsArray = [];
    const maxIngredients = 20;
    for (let index = 0; index < maxIngredients; index += 1) {
      const ingredient = drink[`strIngredient${index}`];
      const measure = drink[`strMeasure${index}`];
      if (ingredient) {
        ingredientsArray.push({
          ingredient,
          measure,
        });
      }
    }
    setIngredientList(ingredientsArray);
  }, [drink]);

  useEffect(() => {
    if (favorite) {
      setFavoriteIcon(bHIcon);
    } else {
      setFavoriteIcon(wHIcon);
    }
  }, [favorite]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes && doneRecipes.some((recipe) => recipe.id === id)) {
      setDoneRecipe(true);
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes.cocktails[id]) {
      setContinueRecipe('Continuar Receita');
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavorite = favoriteRecipes.some((fav) => fav.id === id);
      if (isFavorite) {
        setFavorite(true);
      }
    }
  },
  [drink, id]);

  const saveFavoriteRecipes = () => {
    const favoriteObject = [{
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    }];
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObject));
    } else {
      const updateFavorite = [
        ...favoriteRecipes,
        ...favoriteObject,
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorite));
    }
  };

  const deleteFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updateFavorite = favoriteRecipes.filter((rec) => rec.id !== id);
    if (updateFavorite.length === 0) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorite));
    }
  };

  const handleFavorite = () => {
    if (favorite) {
      deleteFavoriteRecipes();
    } else {
      saveFavoriteRecipes();
    }
    setFavorite(!favorite);
  };

  return (
    <div>
      Detalhes de bebidas:
      <div>
        <img
          style={ imgStyle }
          data-testid="recipe-photo"
          src={ strDrinkThumb }
          alt={ drink }
        />
      </div>
      <div>
        <h3 data-testid="recipe-title">{ strDrink }</h3>
        <Button
          onClick={ () => {
            copy(`http://localhost:3000${location.pathname}`);
            setShare(true);
          } }
          type="button"
        >
          <img
            src={ shareIcon }
            alt="imagem de compartilhar"
            data-testid="share-btn"
          />
        </Button>
        { share && <p>Link copiado!</p> }
        <Button
          type="button"
          onClick={ handleFavorite }
        >
          <img data-testid="favorite-btn" src={ favoriteIcon } alt="favorite" />
        </Button>
        <p data-testid="recipe-category">{ strAlcoholic }</p>
        <p>Ingredientes:</p>
        <ul>
          {ingredientList.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient.ingredient} - ${ingredient.measure}` }
            </li>))}
        </ul>
        <p data-testid="instructions">{ strInstructions }</p>
        {renderRecomendedFood()}
        <Link to={ `/bebidas/${id}/in-progress` }>
          <button
            style={ mystyle }
            variant="contained"
            color="primary"
            type="button"
            data-testid="start-recipe-btn"
            hidden={ doneRecipe }
          >
            {continueRecipe}

          </button>
        </Link>
      </div>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
