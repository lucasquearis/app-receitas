import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';

import {
  fetchApi,
  MEALS_INGREDIENTS_LIST,
  DRINKS_INGREDIENTS_LIST,
  MEALS_INGREDIENTS_IMAGE as mealsImageUrl,
  DRINKS_INGREDIENTS_IMAGE as drinksImageUrl,
} from '../../services';

import Card from '../../components/Card';

function IngrendientsList() {
  const { setSelectedIngredient } = useContext(AppContext);

  const { push } = useHistory();
  const { pathname } = useLocation();

  const pathIsMeals = (pathname.includes('comidas'));
  const ingredientsType = (pathIsMeals) ? 'meals' : 'drinks';

  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const getIngredientsList = async () => {
      try {
        const endPoint = (pathIsMeals) ? MEALS_INGREDIENTS_LIST : DRINKS_INGREDIENTS_LIST;
        const ingredients = await fetchApi(endPoint);
        setIngredientsList(ingredients[ingredientsType]);
      } catch (error) {
        console.log(error);
      }
    };
    getIngredientsList();
  }, [pathIsMeals, ingredientsType]);

  const handleClick = (ingredientName) => {
    setSelectedIngredient(ingredientName);
    push(`/${(pathname.split('/')[2])}`);
  };

  return (
    <>
      {
        ingredientsList.map((ingredient, index) => {
          const ingredientsListLimit = 12;
          const imgUrl = (pathIsMeals) ? mealsImageUrl : drinksImageUrl;

          if (index < ingredientsListLimit) {
            const ingredientName = (pathIsMeals) ? ingredient
              .strIngredient : ingredient.strIngredient1;
            return (
              <button
                data-testid={ `${index}-ingredient-card` }
                key={ `${index}-ingredient-card` }
                type="button"
                onClick={ () => handleClick(ingredientName) }
              >
                <Card
                  img={ `${imgUrl}${ingredientName}-Small.png` }
                  index={ index }
                  name={ ingredientName }
                />
              </button>
            );
          }
          return null;
        })
      }
    </>
  );
}

export default IngrendientsList;
