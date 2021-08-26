import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
// import Carousel from 'react-elastic-carousel';
import copy from 'clipboard-copy';
import Button from '@material-ui/core/Button';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecomendedCard from '../components/RecomendedCard';

function FoodDetails({ match: { params: { id } } }) {
  const [food, setFood] = useState({});
  const [recomendedDrink, setRecomendedDrink] = useState([]);
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = food;
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

  const fetchRecomendedDrink = async () => {
    const endPointRecomendedDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(endPointRecomendedDrink);
    const response = await request.json();
    setRecomendedDrink(response.drinks);
  };

  const renderRecomendedDrink = () => {
    const SEIS = 6;
    const sliceRecomended = recomendedDrink.slice(0, SEIS);
    if (sliceRecomended.length > 0) {
      return (
        <ul>
          {sliceRecomended.map((drink, index) => (
            <RecomendedCard
              title={ drink.strDrink }
              key={ drink.idDrink }
              id={ drink.idDrink }
              index={ index }
              img={ drink.strDrinkThumb }
              visible={ visible[index] }
            />
          ))}
        </ul>
      //   <Carousel data-testid="recomendation-card" itemsToShow={ 2 } itemsToScroll={ 2 }>
      //   {sliceRecomended.map((drink, index) => (
      //     <RecomendedCard
      //       title={ drink.strDrink }
      //       key={ drink.idDrink }
      //       id={ drink.idDrink }
      //       index={ index }
      //       img={ drink.strDrinkThumb }
      //     />
      //   ))}
      // </Carousel>
      );
    }
  };

  useEffect(() => {
    const fetchFoodById = async () => {
      const endPointFoodById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const request = await fetch(endPointFoodById);
      const response = await request.json();
      setFood(response.meals[0]);
    };
    fetchFoodById();
    fetchRecomendedDrink();
    setVisible([false, false, true, true, true, true]);
  }, [id]);

  useEffect(() => {
    const ingredientsArray = [];
    const maxIngredients = 20;
    for (let index = 0; index < maxIngredients; index += 1) {
      const ingredient = food[`strIngredient${index}`];
      const measure = food[`strMeasure${index}`];
      if (ingredient) {
        ingredientsArray.push({
          ingredient,
          measure,
        });
      }
    }
    setIngredientList(ingredientsArray);
  }, [food]);

  return (
    <div>
      Detalhes de comidas:
      <div>
        <img
          style={ imgStyle }
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ food }
        />
      </div>
      <div>
        <h3 data-testid="recipe-title">{ strMeal }</h3>
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
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="favorite" />
        </Button>
        <p data-testid="recipe-category">{ strCategory }</p>
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
        <iframe
          title={ strMeal }
          src={ strYoutube }
          data-testid="video"
        />
        {renderRecomendedDrink()}
        <Button
          style={ mystyle }
          variant="contained"
          color="primary"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita

        </Button>
      </div>
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

// referencia tag iframe para video: https://www.w3schools.com/html/html_youtube.asp
