import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import Button from '@material-ui/core/Button';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkDetails({ match: { params: { id } } }) {
  const [drink, setDrink] = useState({});
  const [recomendedFood, setRecomendedFood] = useState({});
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = drink;
  const [ingredientList, setIngredientList] = useState([]);
  const location = useLocation();
  const [share, setShare] = useState(false);
  const mystyle = {
    bottom: '0px',
    position: 'fixed',
  };

  const imgStyle = {
    width: '300px',
  };

  const fetchRecomendedFood = async () => {
    const endPointRecomendedFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(endPointRecomendedFood);
    const response = await request.json();
    setRecomendedFood(response);
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
          variant="contained"
          color="primary"
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="favorite" />
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
        {/* <p
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          { recomendedFood }
        </p> */}
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

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
