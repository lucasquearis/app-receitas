import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DetailsHeader from '../DetailsHeader';
import Context from '../../../context';
import IngredientsList from '../IngredientsList';
import Instructions from '../Instructions';
import Recommendations from '../Recommendations';
import '../details.css';
import { fetchRecipeDetails } from '../../../services/API';

function Details({ match }) {
  const [recipe, setRecipe] = useState({});
  const { doneRecipes, inProgressList } = useContext(Context);
  const [buttonAppear, setButtonAppear] = useState(false);
  const [loading, setLoading] = useState(true);

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
      const bool = !doneRecipes.find((item) => item.id === drinks[0].idMeal);
      setButtonAppear(bool);
      setLoading(false);
    };
    getRecipe();
  }, [match, doneRecipes, setButtonAppear, setLoading]);

  const favoriteValue = {
    id: recipe.idDrink,
    type: 'bebida',
    area: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  };

  const getIfInProgress = () => (
    inProgressList.cocktails
      && inProgressList.cocktails[recipe.idDrink]
      ? 'Continuar Receita'
      : 'Iniciar Receita');

  return loading ? <p>Loading...</p> : (
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
      { buttonAppear && (
        <Link
          className="start-recipe-btn-container"
          data-testid="start-recipe-btn"
          to={ `/bebidas/${recipe.idDrink}/in-progress` }
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
