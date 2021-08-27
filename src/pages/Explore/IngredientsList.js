import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  fetchApi,
  MEALS_INGREDIENTS_LIST,
  DRINKS_INGREDIENTS_LIST,
  MEALS_INGREDIENTS_IMAGE as mealsImageUrl,
  DRINKS_INGREDIENTS_IMAGE as drinksImageUrl,
} from '../../services';

import Card from '../../components/Card';

function IngrendientsList() {
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
              <div
                data-testid={ `${index}-ingredient-card` }
                key={ `${index}-ingredient-card` }
              >
                <Card
                  img={ `${imgUrl}${ingredientName}-Small.png` }
                  index={ index }
                  name={ ingredientName }
                />
              </div>
            );
          }
          return null;
        })
      }
    </>
  );
}

export default IngrendientsList;
