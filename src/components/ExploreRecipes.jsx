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
    <section>
      <Button
        variant="light"
        onClick={ () => changeRoute(`${pathname}/ingredientes`) }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Button>
      {
        foods
        && (
          <Button
            variant="light"
            data-testid="explore-by-area"
            onClick={ () => changeRoute(`${pathname}/area`) }
          >
            Por Local de Origem
          </Button>
        )
      }
      <Button
        variant="light"
        onClick={ randomRecipe }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
    </section>
  );
}

ExploreRecipes.propTypes = {
  foods: PropTypes.bool,
};

ExploreRecipes.defaultProps = {
  foods: false,
};
