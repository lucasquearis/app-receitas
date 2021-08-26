import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DetailsHeader from '../DetailsHeader';
import IngredientsList from '../IngredientsList';
import Instructions from '../Instructions';
import Recommendations from '../Recommendations';
import '../details.css';
import { fetchRecipeDetails } from '../../../services/API';

function Details({ match }) {
  const [recipe, setRecipe] = useState({});

  const getIngredients = () => {
    const ingredientsList = Array.from({ length: 15 }).reduce((acc, _value, index) => {
      const currentIngredient = recipe[`strIngredient${index + 1}`];
      const currentMeasure = recipe[`strMeasure${index + 1}`];
      const fullIngredient = {
        name: currentIngredient,
        measure: currentMeasure,
      };
      if (currentIngredient) {
        return [...acc, fullIngredient];
      }
      return acc;
    }, []);
    return ingredientsList;
  };

  useEffect(() => {
    const getRecipe = async () => {
      const { params: { id } } = match;
      const { drinks } = await fetchRecipeDetails('thecocktaildb', id);
      setRecipe(drinks[0]);
    };
    getRecipe();
  }, [match]);

  const favoriteValue = {
    id: recipe.idDrink,
    type: 'bebida',
    area: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  };

  return (
    <>
      <div className="hero">
        <Image
          data-testid="recipe-photo"
          alt="drink-thumb"
          className="thumb"
          src={ recipe.strDrinkThumb }
          fluid
        />
      </div>
      <Container className="drink-details-container">
        <DetailsHeader
          url={ match.url }
          favorite={ favoriteValue }
          title={ recipe.strDrink }
          subtitle={ recipe.strAlcoholic }
        />
        <IngredientsList list={ getIngredients() } />
        <Instructions instructions={ recipe.strInstructions } />
        <Recommendations endpoint="themealdb" />
      </Container>
      <Link
        className="start-recipe-btn-container"
        data-testid="start-recipe-btn"
        to={ `/bebidas/${recipe.idDrink}/in-progress` }
      >
        <Button
          className="start-recipe-btn"
          variant="primary"
        >
          Iniciar Receita
        </Button>
      </Link>
    </>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Details;
