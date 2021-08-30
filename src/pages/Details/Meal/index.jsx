import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../details.css';
import Context from '../../../context';
import DetailsHeader from '../DetailsHeader';
import IngredientsList from '../IngredientsList';
import Instructions from '../Instructions';
import Recommendations from '../Recommendations';
import Video from '../Video';
import { fetchRecipeDetails } from '../../../services/API';

function Details({ match }) {
  const [recipe, setRecipe] = useState({});
  const { doneRecipes, inProgressList } = useContext(Context);
  const [buttonAppear, setButtonAppear] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      const { params: { id } } = match;
      const { meals } = await fetchRecipeDetails('themealdb', id);
      setRecipe(meals[0]);
      const bool = !doneRecipes.find((item) => item.id === meals[0].idMeal);
      setButtonAppear(bool);
      setLoading(false);
    };
    getRecipe();
  }, [match, doneRecipes, setButtonAppear, setLoading]);

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

  const favoriteValue = {
    id: recipe.idMeal,
    type: 'comida',
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  };

  const getIfInProgress = () => (
    inProgressList.meals
      && inProgressList.meals[recipe.idMeal]
      ? 'Continuar Receita'
      : 'Iniciar Receita');

  return loading ? <p>Loading...</p> : (
    <>
      <div className="hero">
        <Image
          data-testid="recipe-photo"
          alt="drink-thumb"
          className="thumb"
          src={ recipe.strMealThumb }
          fluid
        />
      </div>
      <Container className="drink-details-container">
        <DetailsHeader
          url={ match.url }
          favorite={ favoriteValue }
          title={ recipe.strMeal }
          subtitle={ recipe.strCategory }
        />
        <IngredientsList list={ getIngredients() } />
        <Instructions instructions={ recipe.strInstructions } />
        <Recommendations endpoint="thecocktaildb" />
        <Video src={ recipe.strYoutube } />
      </Container>
      { buttonAppear && (
        <Link
          className="start-recipe-btn-container"
          data-testid="start-recipe-btn"
          to={ `/comidas/${recipe.idMeal}/in-progress` }
        >
          <Button
            className="start-recipe-btn"
            variant="primary"
          >
            {getIfInProgress()}
          </Button>
        </Link>
      )}
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
