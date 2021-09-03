import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export default function ExploreRecipes({ foods }) {
  const history = useHistory();
  const { pathname } = useLocation();

  const changeRoute = (route) => {
    history.push(route);
  };

  const randomRecipe = async () => {
    const RANDOM_ENDPOINT = foods
      ? 'https://www.themealdb.com/api/json/v1/1/random.php'
      : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    const response = await fetch(RANDOM_ENDPOINT);
    const result = await response.json();

    if (foods) {
      const [food] = result.meals;
      const { idMeal } = food;
      history.push(`/comidas/${idMeal}`);
    } else {
      const [drink] = result.drinks;
      const { idDrink } = drink;
      history.push(`/bebidas/${idDrink}`);
    }
  };

  return (
    <div className="d-flex flex-column w-100 p-3">
      <Button
        style={ { 'font-size': '20pt' } }
        className="border bg-color flex-grow-1"
        onClick={ () => changeRoute(`${pathname}/ingredientes`) }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Button>
      {
        foods
        && (
          <Button
            style={ { 'font-size': '20pt' } }
            className="border bg-color flex-grow-1 mt-2"
            data-testid="explore-by-area"
            onClick={ () => changeRoute(`${pathname}/area`) }
          >
            Por Local de Origem
          </Button>
        )
      }
      <Button
        style={ { 'font-size': '20pt' } }
        className="border bg-color flex-grow-1 mt-2"
        onClick={ randomRecipe }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
    </div>
  );
}

ExploreRecipes.propTypes = {
  foods: PropTypes.bool,
};

ExploreRecipes.defaultProps = {
  foods: false,
};
