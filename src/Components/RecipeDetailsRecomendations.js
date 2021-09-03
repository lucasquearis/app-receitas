import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

import './RecipeDetailsRecomendations.css';

const SIX = 6;

function RecipeDetailsRecomendations({ type }) {
  const [recomendationList, setRecomendationList] = useState([]);

  useEffect(() => {
    if (type === 'drink') {
      const getMealsRecomendations = async () => {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const { meals } = await fetch(endpoint).then((data) => data.json());
        const firstSixMeals = meals.filter((recipe, index) => index < SIX);
        setRecomendationList(firstSixMeals);
      };
      getMealsRecomendations();
    }

    if (type === 'food') {
      const getDrinkRecomendations = async () => {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const { drinks } = await fetch(endpoint).then((data) => data.json());
        const firstSixDrinks = drinks.filter((recipe, index) => index < SIX);
        setRecomendationList(firstSixDrinks);
      };
      getDrinkRecomendations();
    }
  }, [type]);

  return (
    <div className="recomendationsContainer">
      <h3>Recomendações</h3>
      <div className="cardsContainer">
        {
          recomendationList.map((recipe, index) => (
            <Card key={ index } data-testid={ `${index}-recomendation-card` }>
              <Card.Img
                variant="top"
                src={ (type === 'food' ? recipe.strDrinkThumb : recipe.strMealThumb) }
              />
              <Card.Body>
                <Card.Subtitle className="">
                  { (type === 'food' ? recipe.strCategory : recipe.strAlcoholic) }
                </Card.Subtitle>
                <Card.Title data-testid={ `${index}-recomendation-title` }>
                  { (type === 'food' ? recipe.strDrink : recipe.strMeal) }
                </Card.Title>
              </Card.Body>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

RecipeDetailsRecomendations.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetailsRecomendations;
